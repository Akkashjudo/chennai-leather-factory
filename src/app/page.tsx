import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { BusinessStrip } from "@/components/sections/BusinessStrip";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ManufacturingSection } from "@/components/sections/ManufacturingSection";
import { CustomLeatherSection } from "@/components/sections/CustomLeatherSection";
import { PrivateLabelSection } from "@/components/sections/PrivateLabelSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyCLF } from "@/components/sections/WhyCLF";
import { StoreLocation } from "@/components/sections/StoreLocation";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { LeadForm } from "@/components/sections/LeadForm";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "Chennai Leather Factory | Leather Jackets, Shoes, Bags & Wholesale",
  description:
    "Explore leather jackets, shoes, bags, wallets, belts and accessories at Chennai Leather Factory. Retail, wholesale, customization and private-label leather manufacturing in Chennai.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BusinessStrip />
      <CategoryGrid />
      <ManufacturingSection />
      <CustomLeatherSection />
      <PrivateLabelSection />
      <ProductShowcase />
      <WhyCLF />
      <StoreLocation />
      <InstagramSection />
      <LeadForm />
      <CTASection />
    </>
  );
}
