const MIN_SUBMIT_TIME_MS = 3000;
const GENERIC_PLAIN_TEXT_MESSAGE =
  'Este campo debe contener solo texto plano. No use HTML ni scripts.';
const DISALLOWED_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/;
const DISALLOWED_INLINE_MARKUP = /<[^>]*>|[<>]/;

type FieldName = 'company' | 'firstName' | 'lastName' | 'role' | 'email' | 'message';
type ExtendedFieldName = FieldName | 'website';
type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FieldRule {
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  patternMessage?: string;
  plainTextOnly?: boolean;
  plainTextMessage?: string;
}

type FieldRules = Record<FieldName, FieldRule>;
type FieldValues = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELD_RULES: FieldRules = {
  company: {
    label: 'Empresa',
    required: true,
    min: 2,
    max: 120,
    plainTextOnly: true,
  },
  firstName: {
    label: 'Nombre',
    required: true,
    min: 2,
    max: 60,
    pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/,
    patternMessage: 'Use solo letras, espacios, apóstrofe o guion.',
  },
  lastName: {
    label: 'Apellido',
    required: true,
    min: 2,
    max: 60,
    pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]+$/,
    patternMessage: 'Use solo letras, espacios, apóstrofe o guion.',
  },
  role: {
    label: 'Cargo',
    required: false,
    max: 80,
    plainTextOnly: true,
  },
  email: {
    label: 'Correo corporativo',
    required: true,
    max: 254,
  },
  message: {
    label: 'Mensaje',
    required: true,
    min: 20,
    max: 2000,
    plainTextOnly: true,
  },
};

const FIELD_NAMES = Object.keys(FIELD_RULES) as FieldName[];

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();
const normalizeMessage = (value: string) =>
  value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const normalizeByField = (fieldName: ExtendedFieldName, value: string) => {
  if (fieldName === 'message') {
    return normalizeMessage(value);
  }
  if (fieldName === 'email') {
    return normalizeWhitespace(value).toLowerCase();
  }
  return normalizeWhitespace(value);
};

const containsDisallowedMarkup = (value: string) => DISALLOWED_INLINE_MARKUP.test(value);
const containsDisallowedControlChars = (value: string) => DISALLOWED_CONTROL_CHARS.test(value);

interface MockSubmitSuccess {
  ok: true;
  data: {
    requestId: string;
  };
}

interface MockSubmitError {
  ok: false;
  error: {
    code: string;
    message: string;
  };
}

type MockSubmitResult = MockSubmitSuccess | MockSubmitError;

export const initContactForm = () => {
  const form = document.getElementById('contact-form');
  const submitBtn = form?.querySelector('button[type=submit]');
  const btnText = document.getElementById('btn-text');
  const feedback = document.getElementById('form-feedback');

  if (
    !(form instanceof HTMLFormElement) ||
    !(submitBtn instanceof HTMLButtonElement) ||
    !(btnText instanceof HTMLElement) ||
    !(feedback instanceof HTMLElement)
  ) {
    return;
  }

  if (form.dataset.init === 'true') {
    return;
  }

  form.dataset.init = 'true';
  const formStartedAt = performance.now();

  const fields: Record<ExtendedFieldName, Element | null> = {
    company: form.elements.namedItem('company') as Element | null,
    firstName: form.elements.namedItem('firstName') as Element | null,
    lastName: form.elements.namedItem('lastName') as Element | null,
    role: form.elements.namedItem('role') as Element | null,
    email: form.elements.namedItem('email') as Element | null,
    message: form.elements.namedItem('message') as Element | null,
    website: form.elements.namedItem('website') as Element | null,
  };

  const getFieldElement = (name: ExtendedFieldName) => {
    const field = fields[name];
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      return field;
    }
    return null;
  };

  const setState = (state: FormState, message = '') => {
    form.dataset.state = state;
    const labels: Record<FormState, string> = {
      idle: 'Enviar',
      submitting: 'Enviando solicitud...',
      success: 'Solicitud enviada',
      error: 'Reintentar envío',
    };

    btnText.textContent = labels[state] ?? labels.idle;

    if (!message) {
      feedback.classList.add('hidden');
      feedback.textContent = '';
      feedback.className = 'hidden rounded-sm border p-4 text-sm';
      feedback.setAttribute('role', 'status');
      return;
    }

    const isSuccess = state === 'success';
    feedback.className = isSuccess
      ? 'rounded-sm border border-secondary-300/50 bg-primary-100 p-4 text-sm text-secondary-500'
      : 'rounded-sm border border-primary-500/40 bg-primary-500 p-4 text-sm text-neutral-100';

    feedback.setAttribute('role', isSuccess ? 'status' : 'alert');
    feedback.textContent = message;
    feedback.classList.remove('hidden');
  };

  const setFieldError = (fieldName: FieldName, message: string) => {
    const input = getFieldElement(fieldName);
    const errorMessage = form.querySelector(`#${fieldName}-error`);

    if (!input || !(errorMessage instanceof HTMLElement)) {
      return;
    }

    input.setAttribute('aria-invalid', message ? 'true' : 'false');

    if (message) {
      input.classList.add('border-primary-500');
      errorMessage.textContent = message;
      errorMessage.classList.remove('hidden');
      return;
    }

    input.classList.remove('border-primary-500');
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  };

  const clearAllErrors = () => {
    FIELD_NAMES.forEach((fieldName) => {
      setFieldError(fieldName, '');
    });
  };

  const validateFieldValue = (fieldName: FieldName, rawValue: string) => {
    const rule = FIELD_RULES[fieldName];
    const value = normalizeByField(fieldName, rawValue);

    if (rule.required && !value) {
      return `${rule.label} es obligatorio.`;
    }

    if (!value) {
      return '';
    }

    if (containsDisallowedControlChars(value)) {
      return `${rule.label} contiene caracteres no permitidos.`;
    }

    if (rule.plainTextOnly && containsDisallowedMarkup(value)) {
      return rule.plainTextMessage || GENERIC_PLAIN_TEXT_MESSAGE;
    }

    if (rule.min && value.length < rule.min) {
      return `${rule.label} debe tener al menos ${rule.min} caracteres.`;
    }

    if (rule.max && value.length > rule.max) {
      return `${rule.label} no puede superar ${rule.max} caracteres.`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.patternMessage || `${rule.label} tiene un formato inválido.`;
    }

    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailRegex.test(value)) {
        return 'Ingrese un correo electrónico válido.';
      }
    }

    return '';
  };

  const getCurrentValues = (): FieldValues => {
    const snapshot = {
      company: '',
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      message: '',
    } satisfies FieldValues;

    FIELD_NAMES.forEach((fieldName) => {
      const field = getFieldElement(fieldName);
      snapshot[fieldName] = field ? normalizeByField(fieldName, field.value) : '';
    });

    return snapshot;
  };

  const focusFirstError = (errors: FieldErrors) => {
    const firstFieldName = FIELD_NAMES.find((fieldName) => errors[fieldName]);
    if (!firstFieldName) {
      return;
    }

    const firstField = getFieldElement(firstFieldName);
    firstField?.focus();
  };

  const setFormLocked = (locked: boolean) => {
    const controls = form.querySelectorAll('input, textarea, button');
    controls.forEach((control) => {
      if (
        control instanceof HTMLInputElement ||
        control instanceof HTMLTextAreaElement ||
        control instanceof HTMLButtonElement
      ) {
        control.disabled = locked;
      }
    });
    form.setAttribute('aria-busy', locked ? 'true' : 'false');
  };

  const buildPayload = (values: FieldValues) => {
    return {
      company: values.company,
      contact: {
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: `${values.firstName} ${values.lastName}`.trim(),
        role: values.role || null,
        email: values.email,
      },
      message: values.message,
      metadata: {
        contractVersion: 1,
        source: 'contact-section',
        locale: document.documentElement.lang || 'es',
        submittedAt: new Date().toISOString(),
        honeypotPassed: true,
      },
    };
  };

  const mockSubmitContact = async (
    payload: ReturnType<typeof buildPayload>,
  ): Promise<MockSubmitResult> => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const forceError = payload.message.toLowerCase().includes('[force-error]');
    if (forceError) {
      return {
        ok: false,
        error: {
          code: 'MOCK_VALIDATION_ERROR',
          message: 'No fue posible procesar su solicitud. Revise el mensaje y vuelva a intentarlo.',
        },
      };
    }

    return {
      ok: true,
      data: {
        requestId: `mock-${Date.now()}`,
      },
    };
  };

  FIELD_NAMES.forEach((fieldName) => {
    const input = getFieldElement(fieldName);
    if (!input) {
      return;
    }

    input.addEventListener('blur', () => {
      const error = validateFieldValue(fieldName, input.value);
      setFieldError(fieldName, error);
    });

    input.addEventListener('invalid', (event) => {
      event.preventDefault();
      const error = validateFieldValue(fieldName, input.value);
      setFieldError(fieldName, error || `${FIELD_RULES[fieldName].label} es inválido.`);
      setState('error', 'Revise los campos marcados y vuelva a intentarlo.');
    });

    input.addEventListener('input', () => {
      if (form.dataset.state === 'success' || form.dataset.state === 'error') {
        setState('idle', '');
      }

      if (input.getAttribute('aria-invalid') === 'true') {
        const error = validateFieldValue(fieldName, input.value);
        setFieldError(fieldName, error);
      }
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (form.dataset.state === 'submitting') {
      return;
    }

    clearAllErrors();
    setState('idle', '');

    const honeypotField = getFieldElement('website');
    if (honeypotField && normalizeWhitespace(honeypotField.value)) {
      setState('error', 'No se pudo enviar el formulario. Intente nuevamente.');
      return;
    }

    const elapsedMs = performance.now() - formStartedAt;
    if (elapsedMs < MIN_SUBMIT_TIME_MS) {
      setState('error', 'Espere unos segundos antes de enviar el formulario.');
      return;
    }

    const values = getCurrentValues();
    const errors: FieldErrors = {};

    FIELD_NAMES.forEach((fieldName) => {
      const error = validateFieldValue(fieldName, values[fieldName]);
      if (error) {
        errors[fieldName] = error;
        setFieldError(fieldName, error);
      }
    });

    if (Object.keys(errors).length > 0) {
      setState('error', 'Revise los campos marcados y vuelva a intentarlo.');
      focusFirstError(errors);
      return;
    }

    const payload = buildPayload(values);
    setFormLocked(true);
    setState('submitting', 'Validando y preparando su solicitud...');

    try {
      const result = await mockSubmitContact(payload);

      if (!result.ok) {
        setState(
          'error',
          result.error.message || 'No se pudo enviar su solicitud en este momento.',
        );
        return;
      }

      form.reset();
      clearAllErrors();
      setState(
        'success',
        'Solicitud enviada correctamente (simulación local). Nuestro equipo se contactará a la brevedad.',
      );
    } catch {
      setState('error', 'Ocurrió un problema inesperado al preparar el envío. Intente nuevamente.');
    } finally {
      setFormLocked(false);
    }
  });
};
