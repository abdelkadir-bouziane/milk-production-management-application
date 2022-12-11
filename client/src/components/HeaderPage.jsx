import Button from "./Button";
import OptionsInput from "./OptionsInput";
import DateInput from "./DateInput";
import TextInput from "./TextInput";

const HeaderPage = ({
  textBtn,
  fields,
  fieldsParameters,
  orderByValue,
  setOrderByValue,
  filterByField,
  setFilterByField,
  filterByValue,
  setFilterByValue,
  addItem,
}) => {
  const generateInput = (field) => {
    switch (fieldsParameters[field].type) {
      case "text":
        return (
          <TextInput
            textValue={filterByValue}
            setTextValue={setFilterByValue}
            placeholder={`أدخل ${field} ...`}
          />
        );
      case "date":
        return (
          <DateInput
            dateValue={filterByValue}
            setDateValue={setFilterByValue}
          />
        );
      case "options":
        return (
          <OptionsInput
            options={fieldsParameters[field].options}
            optionValue={filterByValue}
            setOptionValue={setFilterByValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <article className="header-page">
      <div className="inputs">
        <div className="order-by">
          <label>رتب حسب</label>
          <OptionsInput
            options={fields}
            optionValue={orderByValue}
            setOptionValue={setOrderByValue}
          />
        </div>

        <div className="filter-by">
          <div className="field">
            <label>فلتر حسب</label>

            <OptionsInput
              options={fields}
              optionValue={filterByField}
              setOptionValue={(field) => {
                setFilterByField(field);
                setFilterByValue("");
              }}
            />
          </div>

          {filterByField ? generateInput(filterByField) : null}
        </div>
      </div>
      <Button text={textBtn} clickHandler={addItem} />
    </article>
  );
};

export default HeaderPage;
