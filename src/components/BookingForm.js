import React, { useState } from "react";
import SubjectCard from "./res_SubjectCard";
import NumberInput from "./res_NumberInput";
import CalendarInput from "./res_CalendarInput";
import MiniCard from "./res_MiniCard";
import OptSelection from "./res_OptSelection";
import Bttn from "./res_Bttn";

const BookingForm = () => {
  const [guestCount, setGuestCount] = useState("0");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [occasion, setOccasion] = useState("");

  const NotAvailableDate = [
    { month: "Jan", date: [14, 16, 17, 18] },
    { month: "Feb", date: [1, 2, 3, 4] },
    { month: "Mar", date: [1, 2, 3, 4] },
    { month: "Apr", date: [17, 18, 19, 20] },
  ];

  const AvailableTime = [
    "9:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  ];

  const OccasionOptions = ["Birthday", "Anniversary"];

  // ✅ 버튼 클릭 시 예약 정보 알림
  const handleSubmit = () => {
    const ReserveInfo = {
      guests: guestCount,
      date: selectedDate ? `${selectedDate.month} ${selectedDate.date}` : "",
      time: selectedTime,
      occasion: occasion,
    };

    alert(`Reservation Info:\n\n Number of guests ${ReserveInfo.guests}\n Date: ${ReserveInfo.date}\n Time: ${ReserveInfo.time}\n Occasion: ${ReserveInfo.occasion}`);
  };

  // ✅ 각 입력 UI를 카드에 전달
  const cardSection = [
    {
      subject: "No of Guests",
      object: <NumberInput value={guestCount} onChange={setGuestCount} />,
    },
    {
      subject: "Date",
      object: (
        <CalendarInput
          notAvailable={NotAvailableDate}
          onDateSelect={(month, date) => setSelectedDate({ month, date })}
        />
      ),
    },
    {
      subject: "Time",
      object: (
        <>
          {AvailableTime.map((time, index) => (
            <MiniCard
              key={index}
              subject={time}
              selected={selectedTime === time}
              onClick={setSelectedTime}
            />
          ))}
        </>
      ),
    },
    {
      subject: "Occasion",
      object: (
        <OptSelection
          options={OccasionOptions}
          value={occasion}
          onChange={setOccasion}
        />
      ),
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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {cardSection.map((item, index) => (
          <SubjectCard
            key={index}
            subject={item.subject}
            object={item.object}
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
