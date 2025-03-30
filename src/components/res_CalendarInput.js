import React, { useState } from "react";

function MiniCalendar({ notAvailable = [] }) {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0 ~ 11
  const [selectedDate, setSelectedDate] = useState(null); // 🔸 사용자가 클릭한 날짜

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);
  const weeks = [];

  let currentDay = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < startDay) || currentDay > daysInMonth) {
        week.push("");
      } else {
        week.push(currentDay);
        currentDay++;
      }
    }
    weeks.push(week);
  }

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const currentMonthUnavailable = notAvailable.find(
    (item) => item.month === monthNames[month]
  );
  const unavailableDates = currentMonthUnavailable?.date || [];

  // 🔹 날짜 클릭 핸들러
  const handleDateClick = (day) => {
    if (!unavailableDates.includes(day)) {
      setSelectedDate(day);
    }
  };

  return (
    <div
      style={{
        fontSize: "1rem",
        width: "100%",
        maxWidth: "300px",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box",
      }}
    >
      {/* 📅 년도 + 월 선택 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{year}</span>
        <select
          value={month}
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
            setSelectedDate(null); // 달 변경 시 선택 초기화
          }}
          style={{ padding: "0.2rem 0.4rem", fontSize: "1rem" }}
        >
          {monthNames.map((name, i) => (
            <option key={i} value={i}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* 🗓️ 요일 + 날짜 격자 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          gap: "2px",
        }}
      >
        {dayNames.map((day, index) => (
          <div key={`${day}-${index}`} style={{ fontWeight: "bold", padding: "4px 0" }}>
            {day}
          </div>
        ))}

        {weeks.flat().map((day, idx) => {
          const isUnavailable = unavailableDates.includes(day);
          const isEmpty = !day;
          const isSelected = day === selectedDate;

          // 배경색 조건
          let backgroundColor = "#fff";
          if (isEmpty) backgroundColor = "#f5f5f5";
          else if (isUnavailable) backgroundColor = "#fff";
          else if (isSelected) backgroundColor = "#facc15"; // 진한 노랑
          else backgroundColor = "#fef9c3"; // 연한 노랑

          return (
            <div
              key={idx}
              onClick={() => !isUnavailable && !isEmpty && handleDateClick(day)}
              style={{
                padding: "2px 0",
                height: "2rem",
                border: "1px solid #eee",
                backgroundColor,
                color: isEmpty ? "#ccc" : "#000",
                fontSize: "1rem",
                cursor: !isUnavailable && !isEmpty ? "pointer" : "default",
                borderRadius: "4px",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MiniCalendar;
