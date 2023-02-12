import React, { useState } from "react";
import FileControl from "../components/FileControl";
import Dropzone from "../components/Dropzone";

const Home = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} />
      <FileControl files={files} />
    </div>
  );
};

export default Home;
