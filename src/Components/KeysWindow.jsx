import React from "react";

const KeysWindow = ({ handleButton }) => {
//   const sciKeys = ["sin", "cos", "ln", "log", "tan", "π", "e", "^", "√"];
  const sciKeys = ["sin", "cos", "ln", "log", "tan", "π", "e", "^", "!", "√"];

  const basicKeys = [
    "7",
    "8",
    "9",
    "*",
    "/",
    "4",
    "5",
    "6",
    "-",
    "(",
    "1",
    "2",
    "3",
    "+",
    ")",
    ".",
    "0",
    "DEL",
    "AC",
    "=",
  ];

  return (
    <div className="keysWindow pt-3">
      <div className="keys_scientific">
        {sciKeys.map((item, index) => (
          <button key={index} onClick={() => handleButton(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="line"></div>
      <div className="keys_basic mt-2">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            className={`${item >= "0" && item <= "9" ? "number" : ""} ${
              item === "=" && "equal"
            } `}
            onClick={() => handleButton(item)}
          >
          {item === "DEL" ? <i className="bi bi-backspace-fill text-white"></i> :
            item === "." ? <i className="bi bi-dot text-white"></i> :
            item === "*" ? <i className="bi bi-x"></i> : item}
            {/* {} */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeysWindow;