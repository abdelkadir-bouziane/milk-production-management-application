const DateInput = ({ dateValue, setDateValue }) => {
  return (
    <div className="date-input">
      <input
        type="date"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
