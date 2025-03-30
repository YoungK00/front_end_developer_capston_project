import React, { useState } from "react";

function NumberInput() {
  const [inputValue, setInputValue] = useState("0");

  const handleIncrement = () => {
    const num = parseInt(inputValue, 10) || 0;
    if (num < 20) {
      setInputValue(String(num + 1));
    }
  };

  const handleDecrement = () => {
    const num = parseInt(inputValue, 10) || 0;
    setInputValue(String(num > 0 ? num - 1 : 0));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const num = parseInt(value, 10);
      if (value === "") {
        setInputValue(""); // 사용자 입력 중 빈 값 허용
      } else if (num <= 20) {
        setInputValue(value);
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || parseInt(inputValue, 10) < 0) {
      setInputValue("0");
    } else if (parseInt(inputValue, 10) > 20) {
      setInputValue("20");
    }
  };

  // ✨ 스타일 객체 정의
  const containerStyle = {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  };

  const boxStyle = {
    backgroundColor: "#fcd34d", // 진한 노란색
    padding: "1px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "transparent", // 배경 투명
    border: "none",                 // 테두리 없음
    fontSize: "25px",
    cursor: "pointer",
    padding: "1px 5px",
    color: "#333",                  // 글자색
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
        <button onClick={handleDecrement} style={buttonStyle}>-</button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          style={inputStyle}
        />
        <button onClick={handleIncrement} style={buttonStyle}>+</button>
      </div>
    </div>
  );
}

export default NumberInput;
