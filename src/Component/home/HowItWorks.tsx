const steps = [
  {
    title: "1. Upload a Photo",
    desc: "Take or upload a clear photo of your skin.",
  },
  {
    title: "2. AI Analysis",
    desc: "Our AI analyzes your skin for issues like acne, dryness, pigmentation, etc.",
  },
  {
    title: "3. Personalized Insights",
    desc: "Get instant recommendations and care tips.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-orange-700">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-orange-600">
              {step.title}
            </h3>
            <p className="text-gray-700">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
