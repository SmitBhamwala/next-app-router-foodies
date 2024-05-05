export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/*"],
      },
    ],
    sitemap: "https://nextfoodies.vercel.app/sitemap.xml",
  };
}
