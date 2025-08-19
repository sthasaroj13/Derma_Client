const scanData = [
  { date: "2025-07-20", issue: "Dry Skin", status: "Analyzed" },
  { date: "2025-07-15", issue: "Acne", status: "Pending" },
  { date: "2025-07-10", issue: "Normal", status: "Analyzed" },
];

const ScanHistory: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold text-orange-600 mb-4">
        Your Scan History
      </h3>
      <ul className="space-y-3">
        {scanData.map((scan, idx) => (
          <li key={idx} className="border-b pb-2">
            <div className="flex justify-between text-gray-700">
              <span>{scan.date}</span>
              <span>{scan.issue}</span>
              <span
                className={
                  scan.status === "Analyzed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {scan.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScanHistory;
