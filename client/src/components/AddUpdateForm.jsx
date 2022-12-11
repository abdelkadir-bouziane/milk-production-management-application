import Button from "./Button";
import OptionsInput from "./OptionsInput";
import DateInput from "./DateInput";
import TextInput from "./TextInput";

const AddUpdateForm = ({
  title,
  parameters,
  cancelTheOperation,
  doTheOperation,
  update,
}) => {
  const generateInput = (parameter) => {
    switch (parameter.type) {
      case "text":
        return (
          <TextInput
            textValue={parameter.value}
            setTextValue={parameter.setter}
            placeholder={`أدخل ${parameter.field} ...`}
          />
        );
      case "date":
        return (
          <DateInput
            dateValue={parameter.value}
            setDateValue={parameter.setter}
          />
        );
      case "options":
        return (
          <OptionsInput
            options={parameter.options}
            optionValue={parameter.value}
            setOptionValue={parameter.setter}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="add-update-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doTheOperation();
        }}
      >
        <h2>{title}</h2>

        <div className="fields">
          {parameters.map((parameter, index) => (
            <div key={index}>
              <label>{parameter.field}</label>
              {generateInput(parameter)}
            </div>
          ))}
        </div>

        <div className="add-update-form-btns">
          <Button text={update ? "تعديل" : "إضافة"} />
          <Button text="إلغاء" clickHandler={cancelTheOperation} secondary />
        </div>
      </form>
    </section>
  );
};

export default AddUpdateForm;
