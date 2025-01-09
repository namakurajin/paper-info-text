
import type { Metadata } from "next";
import "destyle.css";
import "./globals.scss";

import ToastProvider from "@/providers/ToastProvider";

export const metadata: Metadata = {
  title: "論文情報テキストを作成するツール",
  description: "著者名や論文誌名などを入力して、決められたフォーマットのテキストを作成するツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
