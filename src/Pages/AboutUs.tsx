import React from "react";
import Footer from "../Component/home/Footer";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <main className="flex-grow max-w-5xl mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            About Derma AI
          </h1>
          <p className="text-orange-900 max-w-3xl mx-auto text-lg">
            Derma AI is your trusted AI-powered skin health companion, dedicated
            to helping you detect skin issues early and care for your skin with
            personalized insights.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">
            Our Story
          </h2>
          <p className="text-orange-900 leading-relaxed">
            Founded in 2025 by passionate dermatology and AI experts, Derma AI
            combines cutting-edge artificial intelligence with a mission to
            empower people everywhere to understand their skin health better. We
            believe early detection and personalized care are the keys to
            healthy, glowing skin.
          </p>
        </section>
        {/* <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-600 mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {teamMembers.map(({ name, role }, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
              >
                <div className="h-24 w-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center text-orange-600 text-xl font-bold">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold text-orange-700">
                  {name}
                </h3>
                <p className="text-orange-800 mt-1">{role}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Our Values */}
        <section className="mb-16  mx-auto">
          <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-start">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-orange-900 space-y-2 text-lg">
            <li>
              Accuracy & Innovation: Using AI to deliver reliable skin health
              insights.
            </li>
            <li>Privacy & Trust: Your data is safe with us.</li>
            <li>User-Centered Design: Easy and accessible for everyone.</li>
            <li>
              Empowerment: Helping users take charge of their skin health.
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
