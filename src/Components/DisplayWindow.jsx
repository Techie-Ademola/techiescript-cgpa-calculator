import React from "react";

const DisplayWindow = ({ expression, result }) => {
  return (
    <div className="displayWindow">
    <div style={{overflowX: 'auto', width: '100%'}}>
      <p className="expression mb-0">{expression ? expression : 0}</p>
      <p className="result mb-0">{result}</p>
    </div>
    </div>
  );
};

export default DisplayWindow;