export const metadata = {
  title: "Kowalski Concrete Contracting | Simcoe County's Premier Concrete Contractor",
  description: "Over 20 years of professional concrete craftsmanship serving Simcoe County and surrounding areas. Driveways, foundations, patios, infrastructure, and more.",
  verification: { google: "cprzCyvzn9BABFdlN0-7FHiVHSdbN139ubnywzoc3ZI" },
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    <script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
        {/* width=device-width prevents mobile browsers from zooming out to fit wide content */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}<div google-add-preferred-source-btn data-theme="dark"></div></body>
    </html>
  );
}
