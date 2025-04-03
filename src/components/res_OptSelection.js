const OptSelection = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "0.5rem",
        fontSize: "1rem",
        borderRadius: "4px",
      }}
    >
      <option value="" disabled>
        -- Select Occasion --
      </option>
      {options.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    
  );
};

export default OptSelection;