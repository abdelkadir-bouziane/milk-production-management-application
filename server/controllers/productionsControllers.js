const fs = require("fs");

// 1- get milk productions informations
const getProductionsInfos = (req, res) => {
  try {
    fs.readFile("data/milkProductions.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      const obj = JSON.parse(data);
      res.status(200).json(obj.productionsList);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2- add a production
const addProduction = (req, res) => {
  try {
    const { productionDate, milkAmount } = req.body;
    fs.readFile("data/milkProductions.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      const id = ++obj.lastProductionIdentifier;
      obj.productionsList = [
        { id, productionDate, milkAmount },
        ...obj.productionsList,
      ];
      fs.writeFile("data/milkProductions.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, productionDate, milkAmount });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3- update a production
const updateProduction = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { productionDate, milkAmount } = req.body;
    fs.readFile("data/milkProductions.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let obj = JSON.parse(data);
      for (let i = 0; i < obj.productionsList.length; i++) {
        if (obj.productionsList[i].id == id) {
          obj.productionsList[i].productionDate = productionDate;
          obj.productionsList[i].milkAmount = milkAmount;
          break;
        }
      }
      fs.writeFile("data/milkProductions.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json({ id, productionDate, milkAmount });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4- delete a production
const deleteProduction = (req, res) => {
  try {
    const id = Number(req.params.id);
    fs.readFile("data/milkProductions.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let deletedProduction;
      let obj = JSON.parse(data);
      obj.productionsList = obj.productionsList.filter((production) => {
        if (production.id == id) {
          deletedProduction = { ...production };
          return false;
        }
        return true;
      });
      fs.writeFile("data/milkProductions.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json(deletedProduction);
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProductionsInfos,
  addProduction,
  updateProduction,
  deleteProduction,
};
