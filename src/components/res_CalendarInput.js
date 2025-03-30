import React, { useState } from "react";

function MiniCalendar({ notAvailable = [], onDateSelect }) {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getStartDay = (year, month) => new Date(year, month, 1).getDay();

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

  const handleDateClick = (day) => {
    setSelectedDate(day);
    onDateSelect?.(monthNames[month], day); // ✅ BookingForm에 선택값 전달
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
      {/* 상단: 년도 + 월 선택 */}
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
            setSelectedDate(null); // 월 바뀌면 선택 초기화
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

      {/* 달력 격자 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          gap: "2px",
        }}
      >
        {dayNames.map((day, i) => (
          <div key={`${day}-${i}`} style={{ fontWeight: "bold", padding: "4px 0" }}>
            {day}
          </div>
        ))}

        {weeks.flat().map((day, idx) => {
          const isUnavailable = unavailableDates.includes(day);
          const isEmpty = !day;
          const isSelected = day === selectedDate;

          let backgroundColor = "#fff";
          if (isEmpty) backgroundColor = "#f5f5f5";
          else if (isUnavailable) backgroundColor = "#fff";
          else if (isSelected) backgroundColor = "#facc15"; // 선택된 날짜 강조
          else backgroundColor = "#fef9c3"; // 기본 가능 날짜

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isUnavailable && !isEmpty) {
                  handleDateClick(day);
                }
              }}
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
