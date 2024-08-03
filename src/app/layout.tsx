import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AppBar } from "./components/AppBar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "WaaS Exchange",
  description:
    "A wallet as a Service Based Centralised Exchange, similar to CoinDCX.",
  icons: [{ rel: "icon", url: "/favicon.jpg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
