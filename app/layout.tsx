import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Nav } from "./ui/components/ nav";
import { Footer } from "./ui/components/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "black",
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "memuseum",
  description: "meme museum - the cultural space for our shared history",
  applicationName: "memuseum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen container mx-auto">
          <div className="py-4">
            <Nav />
          </div>

          {children}

          <div className="mt-auto py-4">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
