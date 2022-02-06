import React from 'react';
import ReactFileReader from 'react-file-reader';
import { Button } from 'antd';

const ReadCvsFile = () => {
  const handleFile = (e) => {
    const content = e.target.result;
    console.log('file content', content);
    // You can set content in state and show it in render.
  };

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".txt"
        onChange={(e) => handleChangeFile(e.target.files[0])}
      />
    </div>
  );
};

export default ReadCvsFile;
