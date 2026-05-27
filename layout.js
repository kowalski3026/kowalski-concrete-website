export const metadata = {
  title: "Kowalski Concrete Contracting | Simcoe County's Premier Concrete Contractor",
  description: "Over 20 years of professional concrete craftsmanship serving Simcoe County and surrounding areas. Driveways, foundations, patios, infrastructure, and more.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
