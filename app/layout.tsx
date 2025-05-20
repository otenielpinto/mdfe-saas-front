import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";

export const metadata: Metadata = {
  title: "Sistema MDFe",
  description:
    "Sistema de Manifesto Eletrônico de Documentos Fiscais (MDFe) - Gerenciamento completo de documentos fiscais eletrônicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
