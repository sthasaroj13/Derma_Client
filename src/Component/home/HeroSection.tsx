// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAppSelector from "../../Hooks/useAppSelector";
// import Modal from "../Modal/GlobalModal";
// import { useNavigate } from "react-router-dom";
// import AuthModal from "../Modal/AuthModal";
// import { usePredictSkinMutation } from "../../query/server/PredictSkin";

// interface FormValues {
//   file: FileList;
// }

// const HeroSection: React.FC = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, name } = useAppSelector((state) => state.auth);
//   const { register, handleSubmit, reset } = useForm<FormValues>();
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   const handleShowModal = () => {
//     setShowModal((prev) => {
//       const newState = !prev;
//       document.body.style.overflow = newState ? "hidden" : "auto";
//       return newState;
//     });
//   };
//   const [predictSkin, { data: prediction, isLoading, isError }] =
//     usePredictSkinMutation();

//   const onSubmit = async (data: FormValues) => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }

//     const file = data.file?.[0];
//     if (!file) return;

//     setImagePreview(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await predictSkin(formData).unwrap();
//       handleShowModal();
//       reset();
//     } catch (err) {
//       console.error("Prediction error:", err);
//       handleShowModal();
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex flex-col items-center justify-center px-6 py-20 text-center">
//       <h1 className="text-4xl md:text-6xl capitalize font-bold text-orange-600 mb-6">
//         {isAuthenticated
//           ? `Welcome to Derma AI ${name}`
//           : "Welcome to Derma AI"}
//       </h1>

//       <p className="text-orange-900 text-lg md:text-[16px] max-w-2xl">
//         Your AI-powered skin health companion. Detect, learn, and glow
//         confidently.
//       </p>

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
//         <input
//           type="file"
//           accept="image/*"
//           {...register("file", { required: true })}
//           className="hidden"
//           id="file-upload"
//           onChange={(e) => {
//             register("file").onChange(e);
//             handleSubmit(onSubmit)();
//           }}
//         />

//         <label
//           htmlFor="file-upload"
//           className="mt-8 px-6 py-3 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
//         >
//           {isLoading ? "Analyzing..." : "Start Skin Scan"}
//         </label>
//       </form>

//       {/* Modal */}
//       <Modal isOpen={showModal} onClose={handleShowModal}>
//         {imagePreview && (
//           <div className=" pt-3.5">
//             <img
//               src={imagePreview}
//               alt="Selected skin"
//               className="mb-4 w-[24rem] h-[18rem] object-cover  rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {isError ? (
//           <p className="text-red-600 text-[16px]">{"Prediction failed"}</p>
//         ) : prediction ? (
//           <div className="text-orange-800">
//             <h2 className="font-bold text-3xl mb-4 text-start">
//               Prediction Result:
//             </h2>
//             <p className="text-[16px] mb-2  text-start">
//               <strong>Label:</strong> {prediction.predicted_label}
//             </p>
//             <p className="text-[16px]  text-start">
//               <strong>Confidence:</strong>{" "}
//               {(prediction.confidence * 100).toFixed(2)}%
//             </p>
//             <p className="text-[16px] mb-2  text-start">
//               <strong>Treatment:</strong> {prediction.treatment}
//             </p>
//             <p className="text-[13px] italic text-gray-600 mt-4  text-start">
//               {prediction.disclaimer}
//             </p>
//           </div>
//         ) : null}
//       </Modal>

//       <AuthModal
//         isOpen={showAuthModal}
//         onClose={() => setShowAuthModal(false)}
//         onLogin={() => navigate("/login")}
//       />
//     </section>
//   );
// };

// export default HeroSection;

// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { usePredictSkinMutation } from "../../query/server/PredictSkin";
// import useAppSelector from "../../Hooks/useAppSelector";
// import Modal from "../Modal/GlobalModal";
// import AuthModal from "../Modal/AuthModal";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";

// interface FormValues {
//   file: FileList;
// }

// const HeroSection: React.FC = () => {
//   const { isAuthenticated, name } = useAppSelector((state) => state.auth);
//   const { reset } = useForm<FormValues>();
//   const [showPredictionModal, setShowPredictionModal] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showSourceModal, setShowSourceModal] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   const [isCameraLoading, setIsCameraLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const webcamRef = useRef<Webcam | null>(null);

//   const [predictSkin, { data: prediction, isLoading, isError }] =
//     usePredictSkinMutation();
//   const navigate = useNavigate();
//   const handleStartScan = () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }
//     setShowSourceModal(true);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setShowSourceModal(false);
//     handlePredict(file);
//   };
//   const handleshowPredictionModal = () => {
//     setShowPredictionModal((prev) => {
//       const newState = !prev;
//       document.body.style.overflow = newState ? "hidden" : "auto";
//       return newState;
//     });
//   };
//   const handleCapture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (!imageSrc) return;

//     // Convert base64 image to File object
//     const byteString = atob(imageSrc.split(",")[1]);
//     const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const file = new File([ab], "captured_image.jpg", { type: mimeString });

//     setShowCamera(false);
//     handlePredict(file);
//   };

//   const handlePredict = async (file: File) => {
//     setImagePreview(URL.createObjectURL(file));
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await predictSkin(formData).unwrap();
//       setShowPredictionModal(true);
//       reset();
//     } catch (err) {
//       console.error("Prediction error:", err);
//       setShowPredictionModal(true);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex flex-col items-center justify-center px-6 py-20 text-center">
//       <h1 className="text-4xl md:text-6xl capitalize font-bold text-orange-600 mb-6">
//         {isAuthenticated
//           ? `Welcome to Derma AI ${name}`
//           : "Welcome to Derma AI"}
//       </h1>
//       <p className="text-orange-900 text-lg md:text-[16px] max-w-2xl">
//         Your AI-powered skin health companion. Detect, learn, and glow
//         confidently.
//       </p>

//       {/* Start Scan Button */}
//       <button
//         onClick={handleStartScan}
//         className="mt-8 px-6 py-3 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
//       >
//         Start Skin Scan
//       </button>

//       {/* Choose Source Modal */}
//       <Modal isOpen={showSourceModal} onClose={() => setShowSourceModal(false)}>
//         <h2 className="text-xl font-semibold mb-4 text-orange-700">
//           Choose Image Source
//         </h2>
//         <div className="flex flex-col gap-4">
//           <label
//             htmlFor="file-upload"
//             className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-center"
//           >
//             📁 Upload from Device
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileSelect}
//           />

//           <button
//             onClick={() => {
//               setShowSourceModal(false);
//               setShowCamera(true);
//               setIsCameraLoading(true);
//             }}
//             className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
//           >
//             📸 Take a Photo
//           </button>
//         </div>
//       </Modal>

//       {/* Camera Modal */}
//       <Modal
//         isOpen={showCamera}
//         onClose={() => {
//           setShowCamera(false);
//           setIsCameraLoading(false);
//         }}
//       >
//         {isCameraLoading && (
//           <>
//             <div className="flex flex-col items-center py-8">
//               <Loader className="animate-spin text-orange-600 mb-2" size={40} />
//               <p className="text-orange-700 text-sm">Opening camera...</p>
//             </div>
//           </>
//         )}

//         <div
//           className={`transition-opacity ${
//             isCameraLoading ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="rounded-lg w-full max-w-md mx-auto"
//             videoConstraints={{
//               facingMode: "environment", // back camera
//             }}
//             onUserMedia={() => {
//               console.log("Camera loaded!");
//               setIsCameraLoading(false); // STOP LOADER
//             }}
//             onUserMediaError={(err) => {
//               console.error("Camera failed:", err);
//               setIsCameraLoading(false);
//               alert("Camera access denied. Please allow permission.");
//             }}
//           />
//         </div>

//         <div className="flex justify-center gap-4 mt-4">
//           <button
//             onClick={handleCapture}
//             className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-orange-600"
//           >
//             Capture
//           </button>
//           <button
//             onClick={() => setShowCamera(false)}
//             className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>

//       {/* Prediction Result Modal */}
//       <Modal isOpen={showPredictionModal} onClose={handleshowPredictionModal}>
//         {imagePreview && (
//           <div className="pt-3.5">
//             <img
//               src={imagePreview}
//               alt="Selected skin"
//               className="mb-4 w-[24rem] h-[18rem] object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {isError ? (
//           <p className="text-red-600 text-[16px]">Prediction failed</p>
//         ) : prediction ? (
//           <div className="text-orange-800">
//             <h2 className="font-bold text-3xl mb-4 text-start">
//               Prediction Result:
//             </h2>
//             <p className="text-[16px] mb-2 text-start">
//               <strong>Label:</strong> {prediction.predicted_label}
//             </p>
//             <p className="text-[16px] text-start">
//               <strong>Confidence:</strong>{" "}
//               {(prediction.confidence * 100).toFixed(2)}%
//             </p>
//             <p className="text-[16px] mb-2 text-start">
//               <strong>Treatment:</strong> {prediction.treatment}
//             </p>
//             <p className="text-[13px] italic text-gray-600 mt-4 text-start">
//               {prediction.disclaimer}
//             </p>
//           </div>
//         ) : (
//           isLoading && <p className="text-orange-700">Analyzing...</p>
//         )}
//       </Modal>

//       <AuthModal
//         isOpen={showAuthModal}
//         onClose={() => setShowAuthModal(false)}
//         onLogin={() => navigate("/login")}
//       />
//     </section>
//   );
// };

// export default HeroSection;
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePredictSkinMutation } from "../../query/server/PredictSkin";
import useAppSelector from "../../Hooks/useAppSelector";
import Modal from "../Modal/GlobalModal";
import AuthModal from "../Modal/AuthModal";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { Loader, Upload } from "lucide-react";

interface FormValues {
  file: FileList;
}

const HeroSection: React.FC = () => {
  const { isAuthenticated, name } = useAppSelector((state) => state.auth);
  const { reset } = useForm<FormValues>();

  // Modals
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);

  // Image preview (shared across upload & camera)
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const webcamRef = useRef<Webcam | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [predictSkin, { data: prediction, isError }] = usePredictSkinMutation();
  const navigate = useNavigate();

  const handleStartScan = () => {
    // if (!isAuthenticated) {
    //   setShowAuthModal(true);
    //   return;
    // }
    setShowSourceModal(true);
  };

  // Camera Capture
  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setPreviewImage(imageSrc);
    setPreviewFile(null);
    setShowCamera(false);
  };

  // File Upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewImage(ev.target?.result as string);
      setPreviewFile(file);
      setShowSourceModal(false);
    };
    reader.readAsDataURL(file);
  };

  // Predict
  const handlePredict = async () => {
    if (!previewImage) return;

    if (!isAuthenticated) {
      setShowAuthModal(true);
      setShowPredictionModal(false);

      return;
    }
    setIsPredicting(true);

    try {
      let file: File;

      if (previewFile) {
        file = previewFile;
      } else {
        // Convert base64 → File (from camera)
        const byteString = atob(previewImage.split(",")[1]);
        const mimeString = previewImage
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        file = new File([ab], "captured_skin.jpg", { type: mimeString });
      }

      const formData = new FormData();
      formData.append("file", file);

      await predictSkin(formData).unwrap();
      setShowPredictionModal(true);
      reset();
    } catch (err) {
      console.error("Prediction error:", err);
      setShowPredictionModal(true);
    } finally {
      setIsPredicting(false);
      // Do NOT clear previewImage — we need it in result modal
    }
  };

  // Retake / Re-upload
  const handleRetake = () => {
    setPreviewImage(null);
    setPreviewFile(null);
    setShowCamera(true);
    setIsCameraLoading(true);
  };

  const handleReupload = () => {
    setPreviewImage(null);
    setPreviewFile(null);
    fileInputRef.current?.click();
  };

  // Close Result Modal → Clear Image
  const handleCloseResult = () => {
    setShowPredictionModal(false);
    setPreviewImage(null); // Clear after result
    setPreviewFile(null);
  };

  useEffect(() => {
    if (showCamera && isCameraLoading) {
      const timer = setTimeout(() => {
        if (isCameraLoading) {
          setIsCameraLoading(false);
          alert("Camera took too long. Please try again.");
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showCamera, isCameraLoading]);

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

      {/* Start Scan Button */}
      <button
        onClick={handleStartScan}
        className="mt-8 px-6 py-3 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Start Skin Scan
      </button>

      {/* Choose Source Modal */}
      <Modal isOpen={showSourceModal} onClose={() => setShowSourceModal(false)}>
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          Choose Image Source
        </h2>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-center"
          >
            <Upload size={20} />
            Upload from Device
          </label>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          <button
            onClick={() => {
              setShowSourceModal(false);
              setShowCamera(true);
              setIsCameraLoading(true);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
          >
            Take a Photo
          </button>
        </div>
      </Modal>

      {/* Camera Modal */}
      <Modal
        isOpen={showCamera}
        onClose={() => {
          setShowCamera(false);
          setIsCameraLoading(false);
        }}
      >
        <div className="flex flex-col items-center">
          {isCameraLoading && (
            <div className="flex flex-col items-center py-8">
              <Loader className="animate-spin text-orange-600 mb-2" size={40} />
              <p className="text-orange-700 text-sm">Opening camera...</p>
            </div>
          )}

          <div
            className={`transition-opacity ${
              isCameraLoading ? "opacity-0 h-0" : "opacity-100"
            }`}
          >
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg w-full max-w-md mx-auto"
              videoConstraints={{ facingMode: "environment" }}
              onUserMedia={() => setIsCameraLoading(false)}
              onUserMediaError={(err) => {
                console.error("Camera error:", err);
                setIsCameraLoading(false);
                alert("Camera access denied. Please allow permission.");
              }}
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleCapture}
              disabled={isCameraLoading}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Capture
            </button>
            <button
              onClick={() => {
                setShowCamera(false);
                setIsCameraLoading(false);
              }}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal (Shared) */}
      <Modal
        isOpen={!!previewImage}
        onClose={() => {
          setPreviewImage(null);
          setPreviewFile(null);
        }}
      >
        <div className="flex flex-col items-center p-4">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            Review Your Photo
          </h2>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-w-md h-auto rounded-lg shadow-md mb-6 object-contain bg-gray-50"
            />
          )}

          <div className="flex gap-4 w-full max-w-xs">
            <button
              onClick={handlePredict}
              disabled={isPredicting}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 cursor-pointer transition"
            >
              {isPredicting ? "Predicting..." : "Predict"}
            </button>

            <button
              onClick={previewFile ? handleReupload : handleRetake}
              className="flex-1 bg-gray-400 text-white px-6 py-3 cursor-pointer rounded-lg hover:bg-gray-500 transition"
            >
              {previewFile ? "Re-upload" : "Retake"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Prediction Result Modal - SHOW USER'S IMAGE */}
      <Modal isOpen={showPredictionModal} onClose={handleCloseResult}>
        <div className="flex flex-col items-center">
          {/* USER'S IMAGE (from preview) */}
          {previewImage && (
            <div className="mb-6 w-full max-w-md">
              <img
                src={previewImage}
                alt="Your skin photo"
                className="w-full h-auto rounded-lg shadow-md object-contain bg-white"
              />
            </div>
          )}

          {/* Prediction Result */}
          {isError ? (
            <p className="text-red-600 text-lg">
              Prediction failed. Please try again.
            </p>
          ) : prediction ? (
            <div className="text-orange-800 w-full max-w-md text-left">
              <h2 className="font-bold text-2xl mb-4">Prediction Result:</h2>
              <p className="text-base mb-2">
                <strong>Label:</strong> {prediction.predicted_label}
              </p>
              <p className="text-base mb-2">
                <strong>Confidence:</strong>{" "}
                {(prediction.confidence * 100).toFixed(2)}%
              </p>
              <p className="text-base mb-2">
                <strong>Treatment:</strong> {prediction.treatment}
              </p>
              <p className="text-sm italic text-gray-600 mt-4">
                {prediction.disclaimer}
              </p>
            </div>
          ) : (
            <p className="text-orange-700">Analyzing...</p>
          )}
        </div>
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
