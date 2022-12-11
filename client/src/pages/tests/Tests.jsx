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
} from "./testsControllers";

const Tests = () => {
  const { testsList, isLoading } = useSelector((state) => state.tests);
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [testDate, setTestDate] = useState("");
  const [disease, setDisease] = useState("");

  // item fields
  const fields = ["تاريخ الفحص", "المرض"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "date" },
    [fields[1]]: { type: "text" },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    { field: fields[0], type: "date", value: testDate, setter: setTestDate },
    { field: fields[1], type: "text", value: disease, setter: setDisease },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (test) => [
    { field: fields[0], value: test.testDate },
    { field: fields[1], value: test.disease },
  ];

  const finalTestsList = filterAndOrder(
    testsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <section className="page">
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="إضافة فحص طبي"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { testDate, disease }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="تعديل فحص طبي"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { testDate, disease },
              setAddUpdate
            )
          }
          update
        />
      ) : (
        <>
          <h1>قائمة الفحوص الطبية</h1>
          <HeaderPage
            textBtn="أضف فحص"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setTestDate("");
              setDisease("");
              setAddUpdate({ type: "add" });
            }}
          />

          {isLoading ? (
            <div className="loading">
              <Loader size={70} color="#777777" />
            </div>
          ) : finalTestsList.length > 0 ? (
            <div className="items">
              {finalTestsList.map((test, index) => (
                <Item
                  key={index}
                  content={contentItem(test)}
                  updateItem={() => {
                    setTestDate(test.testDate);
                    setDisease(test.disease);
                    setAddUpdate({ type: "update", id: test.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, test.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-list">
              <p>لا يوجد أي فحص مسجل</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Tests;
