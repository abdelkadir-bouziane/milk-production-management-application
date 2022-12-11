import {
  startLoading,
  addCow,
  updateCow,
  deleteCow,
} from "../../features/cows/cowsSlice";

// add a new cow
export const addItem = (dispatch, itemInfos, setAddUpdate) => {
  if (!itemInfos.number || !itemInfos.entryDate || !itemInfos.race) {
    window.alert("لم تدخل كل المعلومات !");
  } else {
    dispatch(startLoading());

    fetch("/api/cows", {
      method: "POST",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((cow) => dispatch(addCow(cow)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// update a cow
export const updateItem = (dispatch, id, itemInfos, setAddUpdate) => {
  if (!itemInfos.number || !itemInfos.entryDate || !itemInfos.race) {
    window.alert("لم تدخل كل المعلومات !");
  } else {
    dispatch(startLoading());

    fetch(`/api/cows/${id}`, {
      method: "PATCH",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((cow) => dispatch(updateCow(cow)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// delete a cow
export const deleteItem = (dispatch, id) => {
  if (window.confirm("هل أنت متأكد من حذف هذه البقرة ؟")) {
    dispatch(startLoading());

    fetch(`/api/cows/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((cow) => dispatch(deleteCow(cow)))
      .catch((err) => {
        console.log(err);
      });
  }
};

const englishFieldName = (arabicFieldName) => {
  switch (arabicFieldName) {
    case "رقم البقرة":
      return "number";
    case "تاريخ الدخول":
      return "entryDate";
    case "السلالة":
      return "race";
    default:
      return "";
  }
};

// filter and order the cowList
export const filterAndOrder = (
  cowsList,
  filterByField,
  filterByValue,
  orderByValue
) => {
  let newCowList = [...cowsList];

  if (filterByField) {
    newCowList = newCowList.filter((cow) =>
      cow[englishFieldName(filterByField)].includes(filterByValue)
    );
  }

  if (orderByValue) {
    newCowList.sort((cow1, cow2) =>
      cow1[englishFieldName(orderByValue)] >
      cow2[englishFieldName(orderByValue)]
        ? 1
        : cow1[englishFieldName(orderByValue)] <
          cow2[englishFieldName(orderByValue)]
        ? -1
        : 0
    );
  }

  return newCowList;
};
