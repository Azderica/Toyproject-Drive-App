import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FileControl = () => {
  const [files, setFiles] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);

  useEffect(() => {
    // Fetch list of files from server
    axios
      .get("/api/files")
      .then((res) => setFiles(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onDrop = (acceptedFiles) => {
    // Upload files to server
    axios
      .post("/api/files/upload", acceptedFiles)
      .then((res) => setFiles([...files, ...res.data]))
      .catch((err) => console.error(err));
  };

  const downloadFile = (file) => {
    // Download file from server
    axios
      .get(`/api/files/download/${file.id}`, { responseType: "blob" })
      .then((res) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([res.data]));
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.error(err));
  };

  const copyFile = (file) => {
    // Copy file on server
    axios
      .post(`/api/files/copy/${file.id}`)
      .then((res) => setFiles([...files, res.data]))
      .catch((err) => console.error(err));
  };

  const deleteFile = (file) => {
    // Delete file from server
    axios
      .delete(`/api/files/${file.id}`)
      .then((res) => setRecycleBin([...recycleBin, file]))
      .catch((err) => console.error(err));
  };

  const restoreFile = (file) => {
    // Restore file from recycle bin
    axios
      .post(`/api/files/restore/${file.id}`)
      .then((res) => setFiles([...files, file]))
      .then((res) => setRecycleBin(recycleBin.filter((f) => f.id !== file.id)))
      .catch((err) => console.error(err));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>File Control</h1>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop files here</p>
      </div>
      <h2>Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}
            <button onClick={() => downloadFile(file)}>Download</button>
            <button onClick={() => copyFile(file)}>Copy</button>
            <button onClick={() => deleteFile(file)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Recycle Bin</h2>
      <ul>
        {recycleBin.map((file) => (
          <li key={file.id}>
            {file.name}
            <button onClick={() => restoreFile(file)}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
