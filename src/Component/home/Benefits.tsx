const benefits = [
  "Early detection of skin conditions",
  "AI accuracy and fast results",
  "Personalized skincare recommendations",
  "Free to try, secure, and private",
];

const Benefits: React.FC = () => {
  return (
    <section className="py-16 bg-white px-6">
      <h2 className="text-3xl font-bold text-center text-orange-700 mb-12">
        Why Use Derma AI?
      </h2>
      <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto list-disc pl-6 text-gray-700">
        {benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </section>
  );
};

export default Benefits;
