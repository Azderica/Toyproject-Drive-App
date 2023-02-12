import React, { useState } from "react";
import axios from "axios";

const FileDownload = () => {
  const [file, setFile] = useState(null);

  const handleFileDownload = () => {
    axios
      .get("/api/file/download", { responseType: "blob" })
      .then((res) => {
        setFile(URL.createObjectURL(new Blob([res.data])));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {file ? (
        <a href={file} download>
          Download
        </a>
      ) : (
        <button onClick={handleFileDownload}>Download</button>
      )}
    </div>
  );
};

export default FileDownload;
