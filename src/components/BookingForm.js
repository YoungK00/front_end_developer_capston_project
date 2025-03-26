import SubjectCard from "./res_SubjectCard";

const BookingForm = () => {
  const cardSection = [
    "No of Guests",
    "Date",
    "Time",
    "Occasion"
  ];

  return (
    <section id="BookingForm-section" className="BookingForm">
      <br />
      <h1 style={{ color: "#495e57" }}>Table Reservation</h1>

      <div className="BookingDetail" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {cardSection.map((title, index) => (
           <SubjectCard key={index} title={title} />
        ))}
      </div>
    </section>
  );
};

export default BookingForm;
