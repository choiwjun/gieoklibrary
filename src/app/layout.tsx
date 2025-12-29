import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "기억책방 - 당신의 이야기가 책이 되는 곳",
  description: "시니어를 위한 AI 자서전 및 디지털 유산 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
