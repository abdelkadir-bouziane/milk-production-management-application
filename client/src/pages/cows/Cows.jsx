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
} from "./cowsControllers";

const Cows = () => {
  const { cowsList, isLoading } = useSelector((state) => state.cows);
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [number, setNumber] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [race, setRace] = useState("");

  // item fields
  const fields = ["رقم البقرة", "تاريخ الدخول", "السلالة"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "text" },
    [fields[1]]: { type: "date" },
    [fields[2]]: {
      type: "options",
      options: ["الهولشتاين", "المونتبليارد"],
    },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    { field: fields[0], type: "text", value: number, setter: setNumber },
    { field: fields[1], type: "date", value: entryDate, setter: setEntryDate },
    {
      field: fields[2],
      type: "options",
      options: ["الهولشتاين", "المونتبليارد"],
      value: race,
      setter: setRace,
    },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (cow) => [
    { field: fields[0], value: cow.number },
    { field: fields[1], value: cow.entryDate },
    { field: fields[2], value: cow.race },
  ];

  const finalCowsList = filterAndOrder(
    cowsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <section className="page">
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="إضافة بقرة"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { number, entryDate, race }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="تعديل بقرة"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { number, entryDate, race },
              setAddUpdate
            )
          }
          update
        />
      ) : (
        <>
          <h1>قائمة البقر</h1>
          <HeaderPage
            textBtn="أضف بقرة"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setNumber("");
              setEntryDate("");
              setRace("");
              setAddUpdate({ type: "add" });
            }}
          />

          {isLoading ? (
            <div className="loading">
              <Loader size={70} color="#777777" />
            </div>
          ) : finalCowsList.length > 0 ? (
            <div className="items">
              {finalCowsList.map((cow, index) => (
                <Item
                  key={index}
                  content={contentItem(cow)}
                  updateItem={() => {
                    setNumber(cow.number);
                    setEntryDate(cow.entryDate);
                    setRace(cow.race);
                    setAddUpdate({ type: "update", id: cow.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, cow.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-list">
              <p>لا توجد أي بقرة مسجلة</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Cows;
