const MiniCard = ({ subject, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(subject)}
      style={{
        flexShrink: 0,
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        backgroundColor: selected ? "#facc15" : "#f4f4f4",
        border: "1px solid #ccc",
        fontSize: "0.9rem",
        minWidth: "60px",
        maxWidth: "80px",
        textAlign: "center",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background-color 0.2s",
      }}
    >
      {subject}
    </div>
  );
};

export default MiniCard;
