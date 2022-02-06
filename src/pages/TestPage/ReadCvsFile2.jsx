import React from 'react';
import CSVReader from 'react-csv-reader';

const ReadCvsFile2 = () => {
  const handleFileLoaded = (data) => {
    if (!data) {
      //console.log('no data');
      return null;
    }
    //console.log(data);
    // console.log(origFile);
    // console.log(data);
  };

  return <CSVReader onFileLoaded={handleFileLoaded} />;
};

export default ReadCvsFile2;
