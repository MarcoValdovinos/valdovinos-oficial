import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARKHÉ ZERO | Kódice Secreto",
  description: "Protocolo de Co-Creatividad Simbiótica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
