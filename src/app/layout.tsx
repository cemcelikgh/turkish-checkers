import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Türk Daması',
  description: "Patika Intermediate Frontend Web Development Path Certification Task",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
