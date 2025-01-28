import { StyledEngineProvider } from "@mui/material/styles";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { Providers } from "./ui/context/providers";
import { Footer } from "./ui/components/footer";
import { Nav } from "./ui/components/nav";
import { authWithGoogle } from "./ui/context/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledEngineProvider injectFirst>
          <Providers>
            <div className="flex flex-col min-h-screen container mx-auto p-2 md:p-0">
              <div className="py-2">
                <Nav handleSignIn={authWithGoogle} />
              </div>

              {children}

              <div className="container mx-auto mt-auto py-2">
                <Footer />
              </div>
            </div>
          </Providers>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
