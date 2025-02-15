import React from "react";

const DisplayWindow = ({ expression, result }) => {
  return (
    <div className="displayWindow">
      <p className="expression mb-0">{expression ? expression : 0}</p>
      <p className="result mb-0">{result}</p>
    </div>
  );
};

export default DisplayWindow;