import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const mulish = Mulish({
  variable: "--font-muli",
  weight: ["400", "500", "700", "900", "1000"], // Choose the weights you need
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mednight",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${mulish.variable} ${mulish.variable} antialiased bg-stone-900`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
