const SubjectCard = ({ subject, object, guideMessage, confirmMessage }) => {
  return (
    <div
      className="subjectCard"
      style={{
        border: "2px solid #F4CE14",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>{subject}</h3>

      <div
        style={{
          marginTop: "0.5rem",
          overflowX: subject === "Time" ? "auto" : "visible",
          whiteSpace: subject === "Time" ? "nowrap" : "normal",
          display: subject === "Time" ? "flex" : "block",
          gap: subject === "Time" ? "0.5rem" : "0",
          maxWidth: "100%",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ✅ object가 있으면 object를, 없으면 confirmMessage를 출력 */}
        {object ? object : <p>{confirmMessage}</p>}
      </div>

      {/* 🔴 guideMessage 빨간 텍스트 */}
      {guideMessage && (
        <div style={{ color: "#dc2626", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          {guideMessage}
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
