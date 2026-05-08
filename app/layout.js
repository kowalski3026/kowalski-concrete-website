export const metadata = {
  title: "Kowalski Concrete Contracting",
  description: "Professional concrete contractor with over 20 years experience.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
