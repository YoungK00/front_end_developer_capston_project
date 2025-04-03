// ✅ res_CalendarInput.js - useEffect 의존성 및 무한 루프 방지 개선
import React, { useState, useEffect } from "react";

function MiniCalendar({ notAvailable = [], onDateSelect }) {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const init = () => {
      const today = new Date();
      const currentMonthName = monthNames[today.getMonth()];
      const unavailable = notAvailable.find(item => item.month === currentMonthName);
      const isUnavailable = unavailable?.date?.includes(today.getDate());

      if (!isUnavailable) {
        setSelectedDate(today.getDate());
        onDateSelect?.(currentMonthName, today.getDate());
      }
    };
    init();
  }, []); // ✅ 최초 1회만 실행되도록 구성

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
    onDateSelect?.(monthNames[month], day);
  };

  return (
    <div style={{ fontSize: "1rem", width: "100%", maxWidth: "300px", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <span style={{ fontWeight: "bold" }}>{year}</span>
        <select
          value={month}
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
            setSelectedDate(null);
          }}
        >
          {monthNames.map((name, i) => (
            <option key={i} value={i}>{name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", textAlign: "center" }}>
        {dayNames.map((day, i) => (
          <div key={i} style={{ fontWeight: "bold" }}>{day}</div>
        ))}
        {weeks.flat().map((day, idx) => {
          const isUnavailable = unavailableDates.includes(day);
          const isEmpty = !day;
          const isSelected = day === selectedDate;

          let backgroundColor = "#fff";
          if (isEmpty) backgroundColor = "#f5f5f5";
          else if (isUnavailable) backgroundColor = "#fff";
          else if (isSelected) backgroundColor = "#facc15";
          else backgroundColor = "#fef9c3";

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isUnavailable && !isEmpty) handleDateClick(day);
              }}
              style={{ backgroundColor, cursor: !isUnavailable && !isEmpty ? "pointer" : "default", border: "1px solid #eee", height: "2rem", borderRadius: "4px" }}
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
