import {
  startLoading,
  addBirth,
  updateBirth,
  deleteBirth,
} from "../../features/births/birthsSlice";

// add a new birth
export const addItem = (dispatch, itemInfos, setAddUpdate) => {
  if (!itemInfos.birthDate || !itemInfos.momNumber) {
    window.alert("لم تدخل كل المعلومات !");
  } else {
    dispatch(startLoading());

    fetch("/api/births", {
      method: "POST",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((birth) => dispatch(addBirth(birth)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// update a birth
export const updateItem = (dispatch, id, itemInfos, setAddUpdate) => {
  if (!itemInfos.birthDate || !itemInfos.momNumber) {
    window.alert("لم تدخل كل المعلومات !");
  } else {
    dispatch(startLoading());

    fetch(`/api/births/${id}`, {
      method: "PATCH",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((birth) => dispatch(updateBirth(birth)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// delete a birth
export const deleteItem = (dispatch, id) => {
  if (window.confirm("هل أنت متأكد من حذف هذه الولادة ؟")) {
    dispatch(startLoading());

    fetch(`/api/births/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((birth) => dispatch(deleteBirth(birth)))
      .catch((err) => {
        console.log(err);
      });
  }
};

const englishFieldName = (arabicFieldName) => {
  switch (arabicFieldName) {
    case "تاريخ الولادة":
      return "birthDate";
    case "رقم البقرة الأم":
      return "momNumber";
    default:
      return "";
  }
};

// filter and order the birthList
export const filterAndOrder = (
  birthsList,
  filterByField,
  filterByValue,
  orderByValue
) => {
  let newBirthList = [...birthsList];

  if (filterByField) {
    newBirthList = newBirthList.filter((birth) =>
      birth[englishFieldName(filterByField)].includes(filterByValue)
    );
  }

  if (orderByValue) {
    newBirthList.sort((birth1, birth2) =>
      birth1[englishFieldName(orderByValue)] >
      birth2[englishFieldName(orderByValue)]
        ? 1
        : birth1[englishFieldName(orderByValue)] <
          birth2[englishFieldName(orderByValue)]
        ? -1
        : 0
    );
  }

  return newBirthList;
};
