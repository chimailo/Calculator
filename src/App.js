import React, { useState } from "react";
import "./styles.css";

const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /[x/+]‑$/

export default function Calculator() {
  const [formula, setFormula] = useState("0");
  const [curValue, setCurValue] = useState("0");
  const [prevValue, setPrevValue] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  const maxDigitWarning = () => {
    setCurValue('Limit Exceeded')
    setPrevValue(curValue)
    setTimeout(() => setCurValue(prevValue), 1000);
  }

  const handleNumberClick = (e) => {
    if (!curValue.includes("Limit")) {
      const value = e.target.value;

      if (curValue.length > 14) {
        maxDigitWarning();
      } else if (evaluated) {
        setCurValue(value)
        setFormula(value !== "0" ? value : "")
      } else {
        setCurValue(curValue === "0" || isOperator.test(curValue)
        ? value
        : curValue + value)
        setFormula(curValue === "0" && value === "0"
        ? formula === "" ? value : formula
        : /([^.0-9]0|^0)$/.test(formula)
          ? formula.slice(0, -1) + value
          : formula + value)
      }
    }
  }

  const handleOperatorClick = (e) => {
    if (!curValue.includes("Limit")) {
      const value = e.target.value;
      setCurValue(value)
      setEvaluated(false)

      if (evaluated) {
        setFormula(prevValue + value)
      } else if (!endsWithOperator.test(formula)) {
        setPrevValue(formula)
        setFormula(formula + value)
      } else if (!endsWithNegativeSign.test(formula)) {
        setFormula((endsWithNegativeSign.test(formula + value) ? formula : prevValue) + value)
      } else if (value !== "‑") {
        setFormula(prevValue + value)
      }
    }
  }

  const handleEvaluatorClick = () => {
    if (!curValue.includes("Limit")) {
      let expression = formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      // no-eval
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      setCurValue(answer.toString())
      setFormula(expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer)
      setPrevValue(answer)
      setEvaluated(true)
    }
  }
  
  const handleClearClick = () => {
    setCurValue("0")
    setFormula('0')
  }
  
  return (
    <div className="App">
      <main className="calculator">
        <div className="formula">
            {formula}
        </div>
        <div id="display" className="display">
          {curValue}
        </div>
        <div className="keypad">
          <button
            id="clear"
            className="key item-clear"
            onClick={handleClearClick}
            value="AC"
          >
            AC
          </button>
          <button id="divide" className="key dimgrey" onClick={handleOperatorClick} value="/">
            /
          </button>
          <button id="multiply" className="key dimgrey" onClick={handleOperatorClick} value="x">
            x
          </button>
          <button id="seven" className="key" onClick={handleNumberClick} value="7">
            7
          </button>
          <button id="eight" className="key" onClick={handleNumberClick} value="8">
            8
          </button>
          <button id="nine" className="key" onClick={handleNumberClick} value="9">
            9
          </button>
          <button id="subtract" className="key dimgrey" onClick={handleOperatorClick} value="-">
            -
          </button>
          <button id="four" className="key" onClick={handleNumberClick} value="4">
            4
          </button>
          <button id="five" className="key" onClick={handleNumberClick} value="5">
            5
          </button>
          <button id="six" className="key" onClick={handleNumberClick} value="6">
            6
          </button>
          <button id="add" className="key dimgrey" onClick={handleOperatorClick} value="+">
            +
          </button>
          <button id="one" className="key" onClick={handleNumberClick} value="1">
            1
          </button>
          <button id="two" className="key" onClick={handleNumberClick} value="2">
            2
          </button>
          <button id="three" className="key" onClick={handleNumberClick} value="3">
            3
          </button>
          <button id="equals" className="key item-equals" onClick={handleEvaluatorClick} value="=">
            =
          </button>
          <button id="decimal" className="key" onClick={handleNumberClick} value=".">
            .
          </button>
          <button id="zero" className="key item-zero" onClick={handleNumberClick} value="0">
            0
          </button>
        </div>
      </main>
      <small>Designed and coded by <strong>Chima Ilo</strong></small>
      <small>Adapted from  <a href='https://codepen.io/freeCodeCamp/full/wgGVVX' rel="noopener noreferrer" target='_blank'>@no_stack_sub_sack</a></small>
    </div>
  );
}
