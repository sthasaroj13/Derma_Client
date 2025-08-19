const InsightsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-gray-700">
      <h3 className="text-xl font-semibold text-orange-600 mb-4">
        Personalized Skincare Tips
      </h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use a gentle cleanser twice daily.</li>
        <li>Moisturize after every wash to prevent dryness.</li>
        <li>Use sunscreen even on cloudy days.</li>
        <li>Schedule your next skin scan in 7 days.</li>
      </ul>
    </div>
  );
};

export default InsightsCard;
