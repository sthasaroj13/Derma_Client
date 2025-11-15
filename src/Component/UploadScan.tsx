import { useNavigate } from "react-router-dom";
import AuthModal from "./Modal/AuthModal";
import Modal from "./Modal/GlobalModal";
import { useState } from "react";
import useAppSelector from "../Hooks/useAppSelector";
import { usePredictSkinMutation } from "../query/server/PredictSkin";

const UploadScan: React.FC = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [predictSkin, { data: prediction, isLoading, isError }] =
    usePredictSkinMutation();

  const handleAnalysis = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await predictSkin(formData).unwrap();

      setShowResultModal((prev) => {
        const newState = !prev;
        document.body.style.overflow = newState ? "hidden" : "auto";
        return newState;
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setShowResultModal(true);
    }
  };

  return (
    <section className="py-16 bg-orange-50 px-6 text-center">
      <h2 className="text-3xl font-bold text-orange-700 mb-6">
        Try Derma AI Now
      </h2>
      <p className="text-orange-900 mb-8">
        Upload a clear photo of your face or skin area and let our AI do the
        rest.
      </p>
      <div className=" flex  justify-center gap-7">
        <input
          type="file"
          accept="image/*"
          className="mb-4 border border-orange-400 p-2 rounded-md cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file) {
              setSelectedFile(file);
              setImagePreview(URL.createObjectURL(file));
            }
          }}
        />

        <button
          disabled={!selectedFile || isLoading}
          onClick={handleAnalysis}
          className="bg-orange-500 text-white px-6  rounded-md hover:bg-orange-600 cursor-pointer  h-[2.6563rem]"
        >
          {isLoading ? "Analyzing..." : "Analyze Skin"}
        </button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => navigate("/login")}
      />
      <Modal isOpen={showResultModal} onClose={() => handleAnalysis()}>
        {imagePreview && (
          <div className="pt-3.5">
            <img
              src={imagePreview}
              alt="Uploaded skin"
              className="mb-4 w-[20rem] h-[14rem] object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {isError ? (
          <p className="text-red-600 text-[16px]">Prediction failed</p>
        ) : prediction ? (
          <div className="text-orange-800">
            <h2 className="font-bold text-2xl mb-4 text-start">
              Prediction Result:
            </h2>
            <p className="text-[16px] mb-2 text-start">
              <strong>Label:</strong> {prediction.predicted_label}
            </p>
            <p className="text-[16px] text-start">
              <strong>Confidence:</strong>{" "}
              {(prediction.confidence * 100).toFixed(2)}%
            </p>
            <p className="text-[16px] mb-2 text-start">
              <strong>Treatment:</strong> {prediction.treatment}
            </p>
            <p className="text-[13px] italic text-gray-600 mt-4 text-start">
              {prediction.disclaimer}
            </p>
          </div>
        ) : null}
      </Modal>
    </section>
  );
};

export default UploadScan;
