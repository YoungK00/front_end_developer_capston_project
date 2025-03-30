import SubjectCard from "./res_SubjectCard";
import NumberInput from "./res_NumberInput";
import CalendarInput from "./res_CalendarInput";
import MiniCard from "./res_MiniCard";

const BookingForm = () => {
  // 예약 불가 날짜 정보
  const NotAvailableDate = [
    { month: "Jan", date: [14, 16, 17, 18] },
    { month: "Feb", date: [1, 2, 3, 4] },
    { month: "Mar", date: [1, 2, 3, 4] },
    { month: "Apr", date: [17, 18, 19, 20] },
  ];

  // 예약 가능 시간
  const AvailableTime = [
    "9:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  // 카드 섹션
  const cardSection = [
    { subject: "No of Guests", object: <NumberInput /> },
    { subject: "Date", object: <CalendarInput notAvailable={NotAvailableDate} /> },
    {
      subject: "Time",
      object: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {AvailableTime.map((time, index) => (
            <MiniCard key={index} subject={time} />
          ))}
        </div>
      ),
    },
    { subject: "Occasion", object: "object4" },
  ];

  return (
    <section id="BookingForm-section" className="BookingForm">
      <br />
      <h1 style={{ color: "#495e57" }}>Table Reservation</h1>

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
    </section>
  );
};

export default BookingForm;
