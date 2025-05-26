"use client";

import Link from "next/link";

export default function Footer({ content, items }) {
  if (!content || !items) return null;

  const { title, subtitle, description, cta_text, cta_link } = content;

  return (
    <footer id="footer" className="bg-black text-white py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section - Brand Message */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 ">{title}</h2>
          <p className="text-pink-300 mb-4">{subtitle}</p>
          <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
          {cta_text && cta_link && (
            <Link
              href={cta_link}
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full transition"
            >
              {cta_text}
            </Link>
          )}
        </div>

        {/* Right Section - Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`${item.cta_link}` || "#"}
                  className="text-gray-300 hover:text-white transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} Your Salon Name. All rights reserved.
      </div>
    </footer>
  );
}
