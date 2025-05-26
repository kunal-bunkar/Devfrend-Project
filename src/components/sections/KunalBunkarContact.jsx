"use client";

import { Mail, Phone, MapPin, Clock, Map } from "lucide-react";
import Header from "@/components/sections/KunalBunkarHeader"; // Make sure this is correct

const iconMap = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  clock: Clock,
  map: Map,
};

export default function ContactPage({ content, items }) {
  if (!content || !items) return null;

  const mapItem = items.find((item) => item.icon === "map");
  const contactItems = items.filter((item) => item.icon !== "map");

  return (
    <section id="contact" className="bg-black from-slate-950 via-slate-900 to-slate-950 text-white px-6 md:px-20 pb-20">
      {/* Header */}
      

      <div className="max-w-7xl mx-auto  space-y-16">
        {/* Page Text */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-extrabold text-pink-700 drop-shadow">{content.title}</h2>
          <p className="text-xl text-pink-300">{content.subtitle}</p>
          <p className="text-slate-400 max-w-2xl mx-auto">{content.description}</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item) => {
            const Icon = iconMap[item.icon] || null;
            return (
              <div
                key={item.id}
                className="bg-slate-900 p-6 rounded-2xl   shadow-lg"
              >
                {Icon && <Icon className=" mb-3" size={28} />}
                <h4 className="text-lg font-semibold  mb-1">{item.title}</h4>
                <p className="text-gray-300 whitespace-pre-line text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Form + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <form className="bg-slate-900 p-8 rounded-2xl   space-y-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Send Us a Message</h3>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-gray-400"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-gray-400"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Message</label>
              <textarea
                rows="5"
                className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-gray-400"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>

          {/* Map */}
          {mapItem?.image_url && (
            <div className="rounded-2xl overflow-hidden border-4  shadow-lg">
              <iframe
                src={mapItem.image_url}
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[450px]"
              ></iframe>
            </div>
          )}
        </div>

        {/* CTA Button */}
        
      </div>
    </section>
  );
}
