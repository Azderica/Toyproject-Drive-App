import React from "react";
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        // <UploadMessage>Drop the files here ...</UploadMessage>
      ) : (
        // <UploadMessage>
        //   Drag 'n' drop some files here, or click to select files
        // </UploadMessage>
      )}
    </DropContainer>
  );
};

export default Dropzone;
