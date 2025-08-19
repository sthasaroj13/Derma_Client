import { useRef, useState } from "react";
import heroSection from "../assets/HeroSectionVdo/0716.mp4";
import ModalUpload from "../Component/Modal/ModalUplaod";
import Webcam from "react-webcam";

const HeroSectionVdo = () => {
  const [selectUpload, setSelectUpLoad] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prev) => [...prev, ...fileArray]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleCameraClick = () => {
    setShowWebcam(true);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prev) => [...prev, imageSrc]);
    }
  };
  const handleRemoveCaptured = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden px-5">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-[75vh] object-cover z-0 "
        >
          <source src={heroSection} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-[75vh] bg-black opacity-40 z-5"></div>

        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center text-white pt-[12rem]">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to DermaAI
            </h1>
            <p className="text-lg md:text-xl">Discover our amazing services</p>

            <div
              onClick={() => setSelectUpLoad(true)}
              className="pt-3 cursor-pointer"
            >
              <span className="bg-orange-400 px-10 rounded-[10px] text-white py-2">
                Upload your Photo
              </span>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <ModalUpload
        isOpen={selectUpload}
        onClose={() => {
          setSelectUpLoad(false);
          setShowWebcam(false);
        }}
        handleFileUploadClick={handleFileUploadClick}
        handleCameraClick={handleCameraClick}
        capturePhoto={capturePhoto}
        showWebcam={showWebcam}
        webcamRef={webcamRef}
        selectedImages={selectedImages}
        capturedImages={capturedImages}
        onRemoveImage={handleRemoveImage}
        onRemoveCaptured={handleRemoveCaptured}
      />
    </>
  );
};

export default HeroSectionVdo;
