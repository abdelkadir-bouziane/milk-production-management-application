const fs = require("fs");

// 1- get births informations
const getBirthsInfos = (req, res) => {
  try {
    fs.readFile("data/births.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      const obj = JSON.parse(data);
      res.status(200).json(obj.birthsList);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2- add a birth
const addBirth = (req, res) => {
  try {
    const { birthDate, momNumber } = req.body;
    fs.readFile("data/births.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      const id = ++obj.lastBirthIdentifier;
      obj.birthsList = [{ id, birthDate, momNumber }, ...obj.birthsList];
      fs.writeFile("data/births.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, birthDate, momNumber });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3- update a birth
const updateBirth = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { birthDate, momNumber } = req.body;
    fs.readFile("data/births.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      for (let i = 0; i < obj.birthsList.length; i++) {
        if (obj.birthsList[i].id == id) {
          obj.birthsList[i].birthDate = birthDate;
          obj.birthsList[i].momNumber = momNumber;
          break;
        }
      }
      fs.writeFile("data/births.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, birthDate, momNumber });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4- delete a birth
const deleteBirth = (req, res) => {
  try {
    const id = Number(req.params.id);
    fs.readFile("data/births.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let deletedBirth;
      let obj = JSON.parse(data);
      obj.birthsList = obj.birthsList.filter((birth) => {
        if (birth.id == id) {
          deletedBirth = { ...birth };
          return false;
        }
        return true;
      });
      fs.writeFile("data/births.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json(deletedBirth);
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getBirthsInfos, addBirth, updateBirth, deleteBirth };
