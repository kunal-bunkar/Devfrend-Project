"use client";

import { useApp } from "@/contexts/AppContext";
import { getComponentKey } from "@/lib/components/registry";
import dynamic from "next/dynamic";

// Dynamic component map for section types and variants - moved to client component
const SECTION_MAP = {
  header_1: dynamic(() => import("@/components/sections/Header1")),
  header_2: dynamic(() => import("@/components/sections/Header2")),
  header_3: dynamic(() => import("@/components/sections/Header3")),
  header_5: dynamic(() => import("@/components/sections/KunalBunkarHeader")),
  hero_1: dynamic(() => import("@/components/sections/Hero1")),
  hero_2: dynamic(() => import("@/components/sections/Hero2")),
  hero_3: dynamic(() => import("@/components/sections/KunalBunkarHero")),
  about_1: dynamic(() => import("@/components/sections/About1")),
  about_2: dynamic(() => import("@/components/sections/KunalBunkarAbout")),
  services_1: dynamic(() => import("@/components/sections/Services1")),
  services_2: dynamic(() => import("@/components/sections/KunalBunkarService")),
  testimonial_1: dynamic(() => import("@/components/sections/Testimonial1")),
  testimonial_2: dynamic(() =>
    import("@/components/sections/KunalBunkarTestimonial")
  ),
  faq_1: dynamic(() => import("@/components/sections/FAQ1")),
  contact_1: dynamic(() => import("@/components/sections/Contact1")),
  contact_2: dynamic(() => import("@/components/sections/KunalBunkarContact")),
  footer_1: dynamic(() => import("@/components/sections/Footer1")),
  footer_2: dynamic(() => import("@/components/sections/Footer2")),
  footer_3: dynamic(() => import("@/components/sections/KunalBunkarFooter")),
  gallery_1: dynamic(() => import("@/components/sections/Gallery1")),
  gallery_2: dynamic(() => import("@/components/sections/Gallery2")),
  features_1: dynamic(() => import("@/components/sections/Features1")),
  features_2: dynamic(() => import("@/components/sections/Features2")),
  pricing_1: dynamic(() => import("@/components/sections/Pricing1")),
  pricing_2: dynamic(() => import("@/components/sections/Pricing2")),
  cta_1: dynamic(() => import("@/components/sections/CTA1")),
  cta_2: dynamic(() => import("@/components/sections/CTA2")),
  team_1: dynamic(() => import("@/components/sections/Team1")),
  team_2: dynamic(() => import("@/components/sections/Team2")),
};

export default function PageContent({ page, sections, theme, config }) {
  // Use the app context to get theme values
  const { theme: contextTheme } = useApp();

  // Merge provided theme with context theme, with context taking precedence
  const themeToUse = { ...theme, ...(contextTheme || {}) };

  return (
    <main>
      <h1 className="sr-only">{page.title}</h1>
      {sections.map((section) => {
        // Skip rendering if type is 'header'
        if (section.type === "header") return null;

        const sectionKey = getComponentKey(section.type, section.variant);
        const DynamicSection = SECTION_MAP[sectionKey];

        if (!DynamicSection) {
          console.warn(`No component found for section type: ${sectionKey}`);
          return null;
        }

        return (
          <section key={section.id} className="section-wrapper">
            <DynamicSection
              content={section.content}
              items={section.items}
              theme={themeToUse}
              config={config}
            />
          </section>
        );
      })}
    </main>
  );
}
