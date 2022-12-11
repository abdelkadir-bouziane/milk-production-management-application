import {
  startLoading,
  addTest,
  updateTest,
  deleteTest,
} from "../../features/tests/testsSlice";

// add a new test
export const addItem = (dispatch, itemInfos, setAddUpdate) => {
  if (!itemInfos.testDate || !itemInfos.disease) {
    window.alert("لم تدخل كل المعلومات !");
  } else {
    dispatch(startLoading());

    fetch("/api/tests", {
      method: "POST",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((test) => dispatch(addTest(test)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// update a test
export const updateItem = (dispatch, id, itemInfos, setAddUpdate) => {
  if (!itemInfos.testDate || !itemInfos.disease) {
    window.alert("لم تدخل كل المعلومات !");
  } else {
    dispatch(startLoading());

    fetch(`/api/tests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(itemInfos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((test) => dispatch(updateTest(test)))
      .catch((err) => {
        console.log(err);
      });

    setAddUpdate({ type: "" });
  }
};

// delete a test
export const deleteItem = (dispatch, id) => {
  if (window.confirm("هل أنت متأكد من حذف هذا الفحص الطبي ؟")) {
    dispatch(startLoading());

    fetch(`/api/tests/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((test) => dispatch(deleteTest(test)))
      .catch((err) => {
        console.log(err);
      });
  }
};

const englishFieldName = (arabicFieldName) => {
  switch (arabicFieldName) {
    case "تاريخ الفحص":
      return "testDate";
    case "المرض":
      return "disease";
    default:
      return "";
  }
};

// filter and order the testList
export const filterAndOrder = (
  testsList,
  filterByField,
  filterByValue,
  orderByValue
) => {
  let newTestList = [...testsList];

  if (filterByField) {
    newTestList = newTestList.filter((test) =>
      test[englishFieldName(filterByField)].includes(filterByValue)
    );
  }

  if (orderByValue) {
    newTestList.sort((test1, test2) =>
      test1[englishFieldName(orderByValue)] >
      test2[englishFieldName(orderByValue)]
        ? 1
        : test1[englishFieldName(orderByValue)] <
          test2[englishFieldName(orderByValue)]
        ? -1
        : 0
    );
  }

  return newTestList;
};
