// App.js
import './App.css';
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import BookingPage from "./components/BookingPage";
import Landing from "./components/Landing";
import ConfirmedBookingPage from "./components/ConfirmPage";
import { submitAPI } from "./api";

function App() {
  const colors = {
    bg_green: "rgb(3, 255, 87)",
    bg_yello: "rgb(255, 208, 0)",
    bg_white: "rgb(255, 255, 255)"
  };

  const [confirmedData, setConfirmedData] = useState(null);
  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      setConfirmedData(formData); // 예약 정보 저장

      // 예약 확인 섹션으로 스크롤
      const confirmSection = document.getElementById("ConfirmedBookingPage-section");
      if (confirmSection) {
        confirmSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="container">
      <Header colors={colors} />
      <main>
        <Landing />
        <BookingPage submitForm={submitForm} />
        <ConfirmedBookingPage formData={confirmedData} />
      </main>
      <Nav />
      <footer></footer>
    </div>
  );
}

export default App;
