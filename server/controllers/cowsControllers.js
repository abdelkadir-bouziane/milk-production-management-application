const fs = require("fs");

// 1- get cows informations
const getCowsInfos = (req, res) => {
  try {
    fs.readFile("data/cows.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      const obj = JSON.parse(data);
      res.status(200).json(obj.cowsList);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2- add a cow
const addCow = (req, res) => {
  try {
    const { number, entryDate, race } = req.body;
    fs.readFile("data/cows.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      const id = ++obj.lastCowIdentifier;
      obj.cowsList = [{ id, number, entryDate, race }, ...obj.cowsList];
      fs.writeFile("data/cows.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, number, entryDate, race });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3- update a cow
const updateCow = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { number, entryDate, race } = req.body;
    fs.readFile("data/cows.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      for (let i = 0; i < obj.cowsList.length; i++) {
        if (obj.cowsList[i].id == id) {
          obj.cowsList[i].number = number;
          obj.cowsList[i].entryDate = entryDate;
          obj.cowsList[i].race = race;
          break;
        }
      }
      fs.writeFile("data/cows.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, number, entryDate, race });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4- delete a cow
const deleteCow = (req, res) => {
  try {
    const id = Number(req.params.id);
    fs.readFile("data/cows.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let deletedCow;
      let obj = JSON.parse(data);
      obj.cowsList = obj.cowsList.filter((cow) => {
        if (cow.id == id) {
          deletedCow = { ...cow };
          return false;
        }
        return true;
      });
      fs.writeFile("data/cows.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json(deletedCow);
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getCowsInfos, addCow, updateCow, deleteCow };
