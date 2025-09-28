import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAppSelector from "../../Hooks/useAppSelector";
import Modal from "../Modal/GlobalModal";
import { useNavigate } from "react-router-dom";
import AuthModal from "../Modal/AuthModal";
import { usePredictSkinMutation } from "../../query/server/PredictSkin";

interface FormValues {
  file: FileList;
}

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, name } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowModal = () => {
    setShowModal((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  };
  const [predictSkin, { data: prediction, isLoading, isError }] =
    usePredictSkinMutation();

  const onSubmit = async (data: FormValues) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const file = data.file?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      await predictSkin(formData).unwrap(); // ✅ RTK Query call
      handleShowModal();
      reset();
    } catch (err) {
      console.error("Prediction error:", err);
      handleShowModal();
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-4xl md:text-6xl capitalize font-bold text-orange-600 mb-6">
        {isAuthenticated
          ? `Welcome to Derma AI ${name}`
          : "Welcome to Derma AI"}
      </h1>

      <p className="text-orange-900 text-lg md:text-[16px] max-w-2xl">
        Your AI-powered skin health companion. Detect, learn, and glow
        confidently.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <input
          type="file"
          accept="image/*"
          {...register("file", { required: true })}
          className="hidden"
          id="file-upload"
          onChange={(e) => {
            register("file").onChange(e);
            handleSubmit(onSubmit)();
          }}
        />

        <label
          htmlFor="file-upload"
          className="mt-8 px-6 py-3 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          {isLoading ? "Analyzing..." : "Start Skin Scan"}
        </label>
      </form>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={handleShowModal}>
        {imagePreview && (
          <div className=" pt-3.5">
            <img
              src={imagePreview}
              alt="Selected skin"
              className="mb-4 w-[24rem] h-[18rem] object-cover  rounded-lg shadow-md"
            />
          </div>
        )}

        {isError ? (
          <p className="text-red-600 text-[16px]">{"Prediction failed"}</p>
        ) : prediction ? (
          <div className="text-orange-800">
            <h2 className="font-bold text-3xl mb-4 text-start">
              Prediction Result:
            </h2>
            <p className="text-[16px] mb-2  text-start">
              <strong>Label:</strong> {prediction.predicted_label}
            </p>
            <p className="text-[16px]  text-start">
              <strong>Confidence:</strong>{" "}
              {(prediction.confidence * 100).toFixed(2)}%
            </p>
            <p className="text-[16px] mb-2  text-start">
              <strong>Treatment:</strong> {prediction.treatment}
            </p>
            <p className="text-[13px] italic text-gray-600 mt-4  text-start">
              {prediction.disclaimer}
            </p>
          </div>
        ) : null}
      </Modal>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => navigate("/login")}
      />
    </section>
  );
};

export default HeroSection;
