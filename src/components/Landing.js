const Landing = () => { // searchText를 prop으로 받음
  return (
    <section
    id="landing-section"
    className="landing"
    style={{
      height: "100vh",         // 💡 전체 화면 높이 설정
      paddingBottom: "50px",   // (선택) 아래 여백
      display: "flex",         // (선택) 중앙 정렬
      flexDirection: "column",
      justifyContent: "left",
      alignItems: "left",
    }}
  >
  

        <br/><br/><br/><br/>
        <h1 style={{ color: "#495E57" }}>This is </h1>
        <h1 style={{ color: "#495E57" }}>Little Lemon's</h1>
        <h1 style={{ color: "#495E57" }}>Dummy Main Page</h1>
        <h1 style={{ color: "#495E57" }}>Press 'Booking' button below pls. </h1>

      </section>
  );
};

export default Landing;
