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
} from "./productionsControllers";

const Productions = () => {
  const { productionsList, isLoading } = useSelector(
    (state) => state.productions
  );
  const dispatch = useDispatch();

  // header page fields values
  const [orderByValue, setOrderByValue] = useState("");
  const [filterByField, setFilterByField] = useState("");
  const [filterByValue, setFilterByValue] = useState("");

  // add or update state
  const [addUpdate, setAddUpdate] = useState({ type: "", id: undefined });

  // add or update fields values
  const [productionDate, setProductionDate] = useState("");
  const [milkAmount, setMilkAmount] = useState("");

  // item fields
  const fields = ["اليوم", "لترات الحليب المنتجة"];

  // add and update section parameters
  const fieldsParameters = {
    [fields[0]]: { type: "date" },
    [fields[1]]: { type: "text" },
  };

  // add and update section parameters
  const addAndUpdateParameters = [
    {
      field: fields[0],
      type: "date",
      value: productionDate,
      setter: setProductionDate,
    },
    {
      field: fields[1],
      type: "text",
      value: milkAmount,
      setter: setMilkAmount,
    },
  ];

  // generate the content (fields & values) of an item
  const contentItem = (production) => [
    { field: fields[0], value: production.productionDate },
    { field: fields[1], value: production.milkAmount },
  ];

  const finalProductionsList = filterAndOrder(
    productionsList,
    filterByField,
    filterByValue,
    orderByValue
  );

  return (
    <section className="page">
      {addUpdate.type === "add" ? (
        <AddUpdateForm
          title="إضافة إنتاجية يوم"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            addItem(dispatch, { productionDate, milkAmount }, setAddUpdate)
          }
        />
      ) : addUpdate.type === "update" ? (
        <AddUpdateForm
          title="تعديل إنتاجية يوم"
          fields={fields}
          parameters={addAndUpdateParameters}
          cancelTheOperation={() => setAddUpdate({ type: "" })}
          doTheOperation={() =>
            updateItem(
              dispatch,
              addUpdate.id,
              { productionDate, milkAmount },
              setAddUpdate
            )
          }
          update
        />
      ) : (
        <>
          <h1>إنتاجية الحليب</h1>
          <HeaderPage
            textBtn="أضف إنتاجية يوم"
            fields={fields}
            fieldsParameters={fieldsParameters}
            orderByValue={orderByValue}
            setOrderByValue={setOrderByValue}
            filterByField={filterByField}
            setFilterByField={setFilterByField}
            filterByValue={filterByValue}
            setFilterByValue={setFilterByValue}
            addItem={() => {
              setProductionDate("");
              setMilkAmount("");
              setAddUpdate({ type: "add" });
            }}
          />

          {isLoading ? (
            <div className="loading">
              <Loader size={70} color="#777777" />
            </div>
          ) : finalProductionsList.length > 0 ? (
            <div className="items">
              {finalProductionsList.map((production, index) => (
                <Item
                  key={index}
                  content={contentItem(production)}
                  updateItem={() => {
                    setProductionDate(production.productionDate);
                    setMilkAmount(production.milkAmount);
                    setAddUpdate({ type: "update", id: production.id });
                  }}
                  deleteItem={() => deleteItem(dispatch, production.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-list">
              <p>لا توجد أي إنتاجية مسجلة</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Productions;
