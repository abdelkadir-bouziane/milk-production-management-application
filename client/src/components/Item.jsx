import Button from "./Button";

const Item = ({ content, updateItem, deleteItem }) => {
  return (
    <article className="item">
      <div className="item-elements">
        {content.map((element, index) => (
          <div key={index}>
            <span className="field">{element.field}</span>
            <br />
            <span className="value">{element.value}</span>
          </div>
        ))}
      </div>
      <div className="item-btns">
        <Button text="تعديل" clickHandler={updateItem} />
        <Button text="حذف" clickHandler={deleteItem} secondary />
      </div>
    </article>
  );
};

export default Item;
