import BookingForm from "./BookingForm";

const BookingPage = () => {
  return (
    <section
      id="BookingPage-section"
      className="booking"
      style={{
        paddingBottom: "50vh", // ✅ 하단 여백 추가
      }}
    >
      <BookingForm />
    </section>
  );
};

export default BookingPage;
