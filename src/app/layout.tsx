import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { IntroLoader, introScript } from "@/components/layout/IntroLoader";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Chennai Leather Factory | Leather Jackets, Shoes, Bags & Wholesale",
    template: "%s | Chennai Leather Factory",
  },
  description:
    "Explore leather jackets, shoes, bags, wallets, belts and accessories at Chennai Leather Factory. Retail, wholesale, customization and private-label leather manufacturing in Chennai.",
  applicationName: site.name,
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#100e0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the pre-paint intro script may add `intro-seen` to <html>.
    <html lang="en-IN" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <IntroLoader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
        <JsonLd data={[localBusinessJsonLd(), organizationJsonLd()]} />
      </body>
    </html>
  );
}
