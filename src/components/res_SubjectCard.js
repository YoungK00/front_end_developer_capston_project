const SubjectCard = ({ title }) => {
  return (
    <div
      className="subjectCard"
      style={{
        border: "2px solid #49DE57",
        borderRadius: "8px",
        padding: "1rem",
        width: "auto",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
  );
};

export default SubjectCard;
