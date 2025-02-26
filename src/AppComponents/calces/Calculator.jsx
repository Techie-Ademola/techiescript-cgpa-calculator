import React, { useState, useEffect } from "react";
import DisplayWindow from "./DisplayWindow.jsx";
import HistoryDrawer from "./HistoryDrawer.jsx";
import KeysWindow from "./KeysWindow.jsx";
import { toast } from "sonner";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
  };

  const calcResult = () => {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);

        // Check if the current expression already exists in history
        const exists = history.some(item => item.expression === expression && item.result === compute);
        
        if (!exists) {
          const newHistory = [...history, { expression, result: compute }];
          setHistory(newHistory);
          localStorage.setItem("calcHistory", JSON.stringify(newHistory));
        }
      } catch (error) {
        toast.success("Calc Error!");
        setResult("0");
      }
    } else {
      toast.success("Calc Error!");
      setResult("0");
    }
  };

  const handleButton = (value) => {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + sciFunc[value]);
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") calcResult();
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  };

  const factorial = (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  };

  const extractLastNum = (exp) => {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  };

  const handleHistoryClick = (item) => {
    setExpression(item.expression);
    setDisplayEXP(item.expression);
    setResult(item.result);
    setIsDrawerOpen(false);
  };

  const clearHistory = () => {
    swal({
      title: `Confirm you want to clear calculation history`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setHistory([]);
        setIsDrawerOpen(false);
        localStorage.removeItem("calcHistory");
        toast.success("History cleared!");
      }
    });
  };

  return (
    <div className="calculator">
      <DisplayWindow expression={displayEXP} result={parseFloat(result).toLocaleString()} />
      <KeysWindow handleButton={handleButton} setIsDrawerOpen={setIsDrawerOpen} />

      {/* <div className="d-sm-flex justify-content-end align-items-center">
        <button
          onClick={() => setIsDrawerOpen(true)}
          style={{ background: "#343a40", color: "white" }}
          className="btn d-block mx-auto mx-sm-0 mb-4 mb-sm-0 mt-0"
        >
        History
        </button>
      </div> */}

      <HistoryDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        history={history} 
        onHistoryClick={handleHistoryClick} 
        onClearHistory={clearHistory} 
      />
    </div>
  );
};

export default Calculator;