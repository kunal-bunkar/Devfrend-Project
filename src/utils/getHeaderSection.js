// lib/utils/getHeaderSection.js
export function getHeaderSection(sections) {
  return sections.find((section) => section.type === "header");
}
