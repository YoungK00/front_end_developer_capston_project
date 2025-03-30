import React, { useState, useEffect } from "react";

function NumberInput({ value = "0", onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (newValue) => {
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    const num = parseInt(inputValue, 10) || 0;
    if (num < 20) {
      handleChange(String(num + 1));
    }
  };

  const handleDecrement = () => {
    const num = parseInt(inputValue, 10) || 0;
    if (num > 0) {
      handleChange(String(num - 1));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const num = parseInt(value, 10);
      if (value === "") {
        handleChange(""); // 입력 중 빈 문자열 허용
      } else if (num <= 20) {
        handleChange(value);
      }
    }
  };

  const handleBlur = () => {
    const num = parseInt(inputValue, 10);
    if (inputValue === "" || isNaN(num) || num < 0) {
      handleChange("0");
    } else if (num > 20) {
      handleChange("20");
    }
  };

  const containerStyle = {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  };

  const boxStyle = {
    backgroundColor: "#fcd34d",
    padding: "1px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "25px",
    cursor: "pointer",
    padding: "1px 5px",
    color: "#333",
  };

  const inputStyle = {
    width: "40px",
    padding: "2px",
    textAlign: "center",
    fontSize: "16px",
    border: "1px solid #cbd5e0",
    borderRadius: "6px",
    margin: "0 2px",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <button onClick={handleDecrement} style={buttonStyle}>
          -
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          style={inputStyle}
          aria-label="Number of guests"
        />
        <button onClick={handleIncrement} style={buttonStyle}>
          +
        </button>
      </div>
    </div>
  );
}

export default NumberInput;
