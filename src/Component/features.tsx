import React from "react";

const features = [
  {
    title: "Smart Search",
    description: "AI-powered property matching for your needs.",
  },
  {
    title: "Verified Listings",
    description: "All listings are vetted and community-rated.",
  },
  {
    title: "Secure Chat",
    description: "Chat directly with landlords via WhatsApp after payment.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white text-gray-800 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Why Dera AI?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feat, i) => (
          <div
            key={i}
            className="rounded-xl shadow-lg p-6 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className="text-gray-600">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
