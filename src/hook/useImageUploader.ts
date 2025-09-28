import { useRef, useState } from "react";

const useImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
        if (e?.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFileName(file.name);
        } else {
            setSelectedImage(null);
            setFileName("");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return {
        selectedImage,
        fileName,
        fileInputRef,
        triggerFileInput,
        handleImageChange,
        setSelectedImage,
    };
};

export default useImageUploader;