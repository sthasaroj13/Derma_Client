import { useGetPrdictSkinQuery } from "../../query/server/PredictSkin";

const ScanHistory: React.FC = () => {
  const { data: getPredicitHistory } = useGetPrdictSkinQuery();
  console.log("his", getPredicitHistory);

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[20rem] overflow-auto">
      <h3 className="text-xl font-semibold text-orange-600 mb-4  ">
        Your Scan History
      </h3>
      <ul className="space-y-3">
        {getPredicitHistory?.map((scan: any, idx: number) => {
          const mappedScan = {
            date: new Date(scan.predicted_date).toLocaleDateString(),
            issue: scan.skin_disease,
            status: scan.confidence > 0.9 ? "Analyzed" : "Pending",
          };

          return (
            <li key={idx} className="border-b pb-2">
              <div className="flex justify-between text-gray-700">
                <span>{mappedScan.date}</span>
                <span>{mappedScan.issue}</span>
                <span
                  className={
                    mappedScan.status === "Analyzed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {mappedScan.status}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScanHistory;
