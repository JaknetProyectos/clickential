import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Click Ential - Desarrollo Web Profesional",
  description: "Ayudamos a que su negocio crezca. Creamos soluciones web personalizadas que se adaptan a sus necesidades y objetivos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Script crossOrigin="anonymous" src="//unpkg.com/same-runtime/dist/index.global.js" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}