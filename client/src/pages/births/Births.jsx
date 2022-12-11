import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader as Loader } from "react-spinners";
import AddUpdateForm from "../../components/AddUpdateForm";
import HeaderPage from "../../components/HeaderPage";
import Item from "../../components/Item";
import {
  addItem,
  updateItem,
  deleteItem,
  filterAndOrder,
} from "./birthsControllers";

const Births = () => {
  const { birthsList, isLoading } = useSelector((state) => state.births);
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [birthDate, setBirthDate] = useState("");
  const [momNumber, setMomNumber] = useState("");

  // item fields
  const fields = ["تاريخ الولادة", "رقم البقرة الأم"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "date" },
    [fields[1]]: { type: "text" },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    { field: fields[0], type: "date", value: birthDate, setter: setBirthDate },
    { field: fields[1], type: "text", value: momNumber, setter: setMomNumber },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (birth) => [
    { field: fields[0], value: birth.birthDate },
    { field: fields[1], value: birth.momNumber },
  ];

  const finalBirthsList = filterAndOrder(
    birthsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <section className="page">
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="إضافة ولادة"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { birthDate, momNumber }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="تعديل ولادة"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { birthDate, momNumber },
              setAddUpdate
            )
          }
          update
        />
      ) : (
        <>
          <h1>قائمة الولادات</h1>
          <HeaderPage
            textBtn="أضف ولادة"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setBirthDate("");
              setMomNumber("");
              setAddUpdate({ type: "add" });
            }}
          />

          {isLoading ? (
            <div className="loading">
              <Loader size={70} color="#777777" />
            </div>
          ) : finalBirthsList.length > 0 ? (
            <div className="items">
              {finalBirthsList.map((birth, index) => (
                <Item
                  key={index}
                  content={contentItem(birth)}
                  updateItem={() => {
                    setBirthDate(birth.birthDate);
                    setMomNumber(birth.momNumber);
                    setAddUpdate({ type: "update", id: birth.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, birth.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-list">
              <p>لا توجد أي ولادة مسجلة</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Births;
