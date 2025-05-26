// /pages/contact.jsx

import contactData from "../../data/d2d.json"; // adjust path to your JSON file
import ContactPage from "@/components/sections/KunalBunkarContact"; // your actual component

export default function Contact() {
  const sections = contactData.pages.home.sections;

  // Find the contact section from the sections array
  const contactSection = sections.find((section) => section.type === "contact");

  if (!contactSection) {
    return <div>No contact section found</div>;
  }

  return (
    <>
      <ContactPage
        content={contactSection.content}
        items={contactSection.items}
        theme={contactData.theme}
        config={contactData.config}
      />
    </>
  );
}
