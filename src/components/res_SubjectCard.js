const SubjectCard = ({ subject, object }) => {
  return (
    <div
      className="subjectCard"
      style={{
        border: "2px solid #F4CE14",
        borderRadius: "8px",
        padding: "0.5rem",
        width: "auto",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>{subject}</h3>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.1rem" }}>
        {object}
      </div>
    </div>
  );
};


export default SubjectCard;
