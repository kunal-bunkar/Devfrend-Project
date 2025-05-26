// /pages/contact.jsx

import contactData from "../../data/d2d.json"; // adjust path to your JSON file
import About from "@/components/sections/KunalBunkarAbout"; // your actual component

export default function Contact() {
  const sections = contactData.pages.home.sections;

  // Find the contact section from the sections array
  const contactSection = sections.find((section) => section.type === "about");

  if (!contactSection) {
    return <div>No contact section found</div>;
  }

  return (
    <About
      content={contactSection.content}
      items={contactSection.items}
      theme={contactData.theme}
      config={contactData.config}
    />
  );
}
