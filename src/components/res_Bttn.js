const Bttn = ({ label = "Submit", onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "1rem",
        backgroundColor: "#facc15",
        border: "none",
        borderRadius: "6px",
        fontSize: "1.2rem",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default Bttn;