import { Camera, ImageUp } from "lucide-react";
import Webcam from "react-webcam";
import GlobalModal from "./GlobalModal";

interface ModalUploadProps {
  isOpen: boolean;
  onClose: () => void;
  handleFileUploadClick: () => void;
  handleCameraClick: () => void;
  capturePhoto: () => void;
  showWebcam: boolean;
  webcamRef: React.RefObject<Webcam | null>;
  selectedImages: string[];
  capturedImages: string[];
  onRemoveImage: (index: number) => void;
  onRemoveCaptured: (index: number) => void;
}

const ModalUpload = ({
  isOpen,
  onClose,
  handleFileUploadClick,
  handleCameraClick,
  capturePhoto,
  showWebcam,
  webcamRef,
  selectedImages,
  capturedImages,
  onRemoveImage,
  onRemoveCaptured,
}: ModalUploadProps) => {
  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title="Upload or Choose">
      <div className="flex flex-col items-center gap-5 overflow-auto">
        <div className="flex justify-evenly w-full">
          <div className="cursor-pointer" onClick={handleFileUploadClick}>
            <ImageUp size={100} />
          </div>
          <div className="cursor-pointer" onClick={handleCameraClick}>
            <Camera size={100} />
          </div>
        </div>

        {showWebcam && (
          <div className="flex flex-col items-center">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="rounded-lg"
            />
            <button
              onClick={capturePhoto}
              className="mt-2 rounded-[.625rem] bg-orange-400 text-white px-4 py-2"
            >
              Capture Photo
            </button>
          </div>
        )}

        {(selectedImages.length > 0 || capturedImages.length > 0) && (
          <div className="mt-3 grid grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto">
            {/* Render uploaded images */}
            {selectedImages.map((src, index) => (
              <div key={`uploaded-${index}`} className="relative group">
                <img
                  src={src}
                  alt={`Uploaded ${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            {/* Render captured images */}
            {capturedImages.map((src, index) => (
              <div key={`captured-${index}`} className="relative group">
                <img
                  src={src}
                  alt={`Captured ${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  onClick={() => onRemoveCaptured(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        {capturedImages.length > 0 && (
          <div className=" bg-orange-400 text-white py-1 px-2.5 cursor-pointer  rounded-[.625rem]">
            Predict
          </div>
        )}

        {selectedImages.length > 0 && (
          <div className=" bg-orange-400 text-white py-1 px-2.5 cursor-pointer  rounded-[.625rem]">
            Predict
          </div>
        )}
      </div>
    </GlobalModal>
  );
};

export default ModalUpload;
