import { useState } from "react";
import imageCompression from "browser-image-compression";
import service from "../appwrite/config"; // Ensure this points to the correct service file

const Trail = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload status
  const [error, setError] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Options for compression
        const options = {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1024, // Max width or height
          useWebWorker: true, // Use a web worker for faster compression
        };

        const compressedBlob = await imageCompression(file, options);
        // Convert Blob to File for Appwrite compatibility
        const compressedFile = new File(
          [compressedBlob],
          file.name,
          { type: file.type }
        );

        setImage(compressedFile); // Set compressed image to state
        console.log("Compressed file:", compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
        setError("Failed to compress image.");
      }
    }
  };

  const uploadToAppwrite = async () => {
    if (!image) {
      setError("No image selected!");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      console.log("Uploading image to Appwrite...");
      const response = await service.uploadFile(image);
      console.log("File uploaded successfully:", response);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file to Appwrite:", error);
      setError("Failed to upload the image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload and Compress Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={uploadToAppwrite} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Trail;
