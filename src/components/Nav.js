import { useState, useEffect } from "react";
import homeIcon from "../images/home_normal.png";
import homeIcon_Active from "../images/home_active.png";


const Nav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleClick = (anchor) => (event) => {
    event.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🔧 스타일 정의
  const navStyle = {
    backgroundColor: "#ffffff",
    height: "10vh",
    position: "fixed",
    top: "8vh",
    left: 0,
    width: "100%",
    zIndex: 999,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const navItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10vw",
  };

  const navIconStyle = {
    maxWidth: "30px",
    maxHeight: "30px",
  };

  // 모바일 대응: 하단 고정
  const isMobile = window.innerWidth <= 450;
  if (isMobile) {
    navStyle.top = "auto";
    navStyle.bottom = 0;
  }

  return (
    <nav style={navStyle}>
      <a href="#landing-section" onClick={handleClick("landing")} style={navItemStyle}>
        <img
          src={activeSection === "landing-section" ? homeIcon_Active : homeIcon}
          alt="Home"
          style={navIconStyle}
        />
      </a>

      <a href="#BookingPage-section" onClick={handleClick("BookingPage")} style={navItemStyle}>
        <h2>Booking</h2>
      </a>

    </nav>
  );
};

export default Nav;
