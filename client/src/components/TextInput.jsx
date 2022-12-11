const TextInput = ({ textValue, setTextValue, placeholder }) => {
  return (
    <div className="text-input">
      <input
        type="text"
        value={textValue}
        placeholder={placeholder}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
