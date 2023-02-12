import React, { useState } from "react";
import axios from "axios";
import Multer from "multer";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/file/upload", formData)
      .then(() => {
        console.log("File uploaded successfully!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
