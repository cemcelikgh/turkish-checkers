import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
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
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}

export default RootLayout;
