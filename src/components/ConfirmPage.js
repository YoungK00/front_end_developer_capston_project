import SubjectCard from "./res_SubjectCard";

const ConfirmedBookingPage = ({ formData }) => {
  console.log("formData in ConfirmPage:", formData);

  if (!formData) {
    return (
      <section id="ConfirmedBookingPage-section" className="ConfirmedBookingPage">
        <h1>Booking confirmation</h1>
        <p style={{ fontStyle: "italic" }}>No reservation yet.</p>
      </section>
    );
  }

  const cardSection = [
    { subject: "No of Guests", confirmMessage: formData.guests || "N/A" },
    { subject: "Date", confirmMessage: formData.date || "N/A" },
    { subject: "Time", confirmMessage: formData.time || "N/A" },
    { subject: "Occasion", confirmMessage: formData.occasion || "N/A" },
  ];

  return (
    <section id="ConfirmedBookingPage-section" className="ConfirmedBookingPage">
      <h1>Booking confirmation</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {cardSection.map((item, index) => (
          <SubjectCard
            key={index}
            subject={item.subject}
            confirmMessage={item.confirmMessage}
          />
        ))}
      </div>

     {/* ✅ 예약 정보 요약을 확실히 텍스트로 보여주기 */}
        <div style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f4f4f4",
          border: "1px solid #ccc",
          borderRadius: "8px",
          color: "#333",
          fontFamily: "monospace",
          fontSize: "1.1rem"
        }}>
          Reservation Info: {"\n"}
          Guests: {formData.guests}{" | "}
          Date: {formData.date}{" | "}
          Time: {formData.time}{" | "}
          Occasion: {formData.occasion}
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

    </section>
  );
};

export default ConfirmedBookingPage;
