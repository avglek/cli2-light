import React from 'react';
import CSVReader from 'react-csv-reader';

const ReadCvsFile2 = () => {
  const handleFileLoaded = (data) => {
    if (!data) {
      return null;
    }

  };

  return <CSVReader onFileLoaded={handleFileLoaded} />;
};

export default ReadCvsFile2;
