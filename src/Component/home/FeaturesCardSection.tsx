import React from "react";

const FeaturesCardSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-orange-50 flex flex-col items-center justify-center px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-10 text-center">
        Discover Derma AI's Power
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200">
          <div className="text-4xl font-bold text-orange-600 mb-4">95%</div>
          <h3 className="text-xl font-semibold text-orange-900 mb-2">
            High Accuracy
          </h3>
          <p className="text-orange-800 text-sm">
            Achieve reliable skin condition detection with our AI's 95% accuracy
            rate.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200">
          <div className="text-4xl font-bold text-orange-600 mb-4">30s</div>
          <h3 className="text-xl font-semibold text-orange-900 mb-2">
            Fast Results
          </h3>
          <p className="text-orange-800 text-sm">
            Get your skin analysis in just 30 seconds with our advanced
            technology.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200">
          <div className="text-4xl font-bold text-orange-600 mb-4">100%</div>
          <h3 className="text-xl font-semibold text-orange-900 mb-2">
            User-Friendly
          </h3>
          <p className="text-orange-800 text-sm">
            Enjoy a seamless experience with our intuitive and easy-to-use
            interface.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-200">
          <div className="text-4xl font-bold text-orange-600 mb-4">AI</div>
          <h3 className="text-xl font-semibold text-orange-900 mb-2">
            Personalized Insights
          </h3>
          <p className="text-orange-800 text-sm">
            Receive tailored recommendations for your skin health based on AI
            analysis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCardSection;
