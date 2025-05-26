import "./globals.css";
import { Inter } from "next/font/google";
import Header5 from "@/components/sections/KunalBunkarHeader"; // Header Path
import { AppProvider } from "@/contexts/AppContext";
import ThemeProvider from "@/contexts/ThemeProvider";

import contactData from "../data/d2d.json"; // adjust path to your JSON file

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const sections = contactData.pages.home.sections;

  // Find the contact section from the sections array
  const contactSection = sections.find((section) => section.type === "header");
  console.log(contactSection);

  if (!contactSection) {
    return <div>No contact section found</div>;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ThemeProvider>
            <Header5
              content={contactSection.content}
              items={contactSection.items}
              theme={contactData.theme}
              config={contactData.config}
            />
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
