import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Café del Pintor | Restaurant en Cerro Alegre, Valparaíso",
  description:
    "Cocina chilena, ambiente artístico y restaurant familiar en Urriola 652, Cerro Alegre, Valparaíso.",
  openGraph: {
    title: "Café del Pintor | Restaurant en Cerro Alegre, Valparaíso",
    description:
      "Cocina chilena, ambiente artístico y restaurant familiar en Urriola 652, Cerro Alegre, Valparaíso.",
    type: "website",
    locale: "es_CL",
    siteName: "Café del Pintor",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
