import React, { useState, useEffect } from "react";
import SubjectCard from "./res_SubjectCard";
import NumberInput from "./res_NumberInput";
import CalendarInput from "./res_CalendarInput";
import MiniCard from "./res_MiniCard";
import OptSelection from "./res_OptSelection";
import Bttn from "./res_Bttn";
import { fetchAPI, submitAPI } from "../api"; // ✅ 전역 대신 모듈 import 사용

const BookingForm = () => {
  const [guestCount, setGuestCount] = useState("0");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [occasion, setOccasion] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const [guestGuide, setGuestGuide] = useState("");
  const [dateGuide, setDateGuide] = useState("");
  const [timeGuide, setTimeGuide] = useState("");
  const [occasionGuide, setOccasionGuide] = useState("");

  const NotAvailableDate = [
    { month: "Jan", date: [14, 16, 17, 18] },
    { month: "Feb", date: [1, 2, 3, 4] },
    { month: "Mar", date: [1, 2, 3, 4] },
    { month: "Apr", date: [17, 18, 19, 20] },
  ];

  const OccasionOptions = ["Birthday", "Anniversary", "Other"];

  // 오늘 날짜 기반 초기 availableTimes 세팅
  useEffect(() => {
    const today = new Date();
    const times = fetchAPI(today);
    setAvailableTimes(times);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    setSelectedDate({ month: monthNames[today.getMonth()], date: today.getDate() });
  }, []);

  // 날짜 변경 시 시간 목록 새로 불러오기
  const handleDateSelect = (month, date) => {
    setSelectedDate({ month, date });
    setDateGuide("");
    const selected = new Date(`${month} ${date}, ${new Date().getFullYear()}`);
    const times = fetchAPI(selected);
    setAvailableTimes(times);
  };

  const handleGuestChange = (value) => {
    setGuestCount(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 20) setGuestGuide("");
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeGuide("");
  };

  const handleOccasionChange = (value) => {
    setOccasion(value);
    setOccasionGuide("");
  };

  const handleSubmit = () => {
    let valid = true;
    const guestNum = parseInt(guestCount, 10);

    if (isNaN(guestNum) || guestNum < 1 || guestNum > 20) {
      setGuestGuide("please enter guests between 1 and 20");
      valid = false;
    }

    if (!selectedDate) {
      setDateGuide("please select date.");
      valid = false;
    }

    if (!selectedTime) {
      setTimeGuide("please select time.");
      valid = false;
    }

    if (!occasion) {
      setOccasionGuide("please select occasion.");
      valid = false;
    }

    if (!valid) return;

    const ReserveInfo = {
      guests: guestCount,
      date: `${selectedDate.month} ${selectedDate.date}`,
      time: selectedTime,
      occasion: occasion,
    };

    const success = submitAPI(ReserveInfo);
    if (success) {
      alert("Reservation completed!");
    } else {
      alert("Reservation failed.");
    }
  };

  const cardSection = [
    {
      subject: "No of Guests",
      object: <NumberInput value={guestCount} onChange={handleGuestChange} />,
      guideMessage: guestGuide,
    },
    {
      subject: "Date",
      object: (
        <CalendarInput
          notAvailable={NotAvailableDate}
          onDateSelect={handleDateSelect}
        />
      ),
      guideMessage: dateGuide,
    },
    {
      subject: "Time",
      object: (
        <>
          {availableTimes.length === 0 ? (
            <p style={{ fontStyle: "italic" }}>No times available</p>
          ) : (
            availableTimes.map((time, index) => (
              <MiniCard
                key={index}
                subject={time}
                selected={selectedTime === time}
                onClick={handleTimeSelect}
              />
            ))
          )}
        </>
      ),
      guideMessage: timeGuide,
    },
    {
      subject: "Occasion",
      object: (
        <OptSelection
          options={OccasionOptions}
          value={occasion}
          onChange={handleOccasionChange}
        />
      ),
      guideMessage: occasionGuide,
    },
  ];

  return (
    <section
      id="BookingForm-section"
      className="BookingForm"
      role="form"
      aria-labelledby="reservation-heading"
    >
      <br />
      <h1 id="reservation-heading" style={{ color: "#495e57" }}>
        Table Reservation
      </h1>

      <div
        className="BookingDetail"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {cardSection.map((item, index) => (
          <SubjectCard
            key={index}
            subject={item.subject}
            object={item.object}
            guideMessage={item.guideMessage}
          />
        ))}
      </div>

      <div className="submitBttn" style={{ marginTop: "1rem" }}>
        <Bttn label="Reserve" onClick={handleSubmit} />
      </div>
    </section>
  );
};

export default BookingForm;
