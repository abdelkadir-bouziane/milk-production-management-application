const fs = require("fs");

// 1- get medical tests informations
const getTestsInfos = (req, res) => {
  try {
    fs.readFile("data/medicalTests.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      const obj = JSON.parse(data);
      res.status(200).json(obj.testsList);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2- add a medical test
const addTest = (req, res) => {
  try {
    const { testDate, disease } = req.body;
    fs.readFile("data/medicalTests.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      const id = ++obj.lastTestIdentifier;
      obj.testsList = [{ id, testDate, disease }, ...obj.testsList];
      fs.writeFile("data/medicalTests.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, testDate, disease });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3- update a medical test
const updateTest = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { testDate, disease } = req.body;
    fs.readFile("data/medicalTests.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      for (let i = 0; i < obj.testsList.length; i++) {
        if (obj.testsList[i].id == id) {
          obj.testsList[i].testDate = testDate;
          obj.testsList[i].disease = disease;
          break;
        }
      }
      fs.writeFile("data/medicalTests.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, testDate, disease });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4- delete a medical test
const deleteTest = (req, res) => {
  try {
    const id = Number(req.params.id);
    fs.readFile("data/medicalTests.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let deletedTest;
      let obj = JSON.parse(data);
      obj.testsList = obj.testsList.filter((test) => {
        if (test.id == id) {
          deletedTest = { ...test };
          return false;
        }
        return true;
      });
      fs.writeFile("data/medicalTests.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json(deletedTest);
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getTestsInfos, addTest, updateTest, deleteTest };
