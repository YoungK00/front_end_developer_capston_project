const MiniCard = ({ subject }) => {
  return (
    <div
      style={{
        display: "inline-block",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        backgroundColor: "#f4f4f4",
        border: "1px solid #ccc",
        fontSize: "0.9rem",
        minWidth: "70px",       // 💡 모바일에서 너무 작아지지 않게
        textAlign: "center",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,          // 💡 줄바꿈 없이 유지
      }}
    >
      {subject}
    </div>
  );
};

export default MiniCard;
