import android192 from "@assets/identity/android-chrome-192x192.png";
import android512 from "@assets/identity/android-chrome-512x512.png";

export async function GET() {
  const manifest = {
    name: "Salair",
    short_name: "Salair",
    description: "Soluciones profesionales de climatización y refrigeración industrial en Chile.",
    icons: [
      {
        src: android192.src,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: android512.src,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#091A38",
    background_color: "#F9FAFB",
    display: "standalone",
    start_url: "/",
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
    },
  });
}
