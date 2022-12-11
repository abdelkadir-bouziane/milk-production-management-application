const express = require("express");
const {
  getProductionsInfos,
  addProduction,
  updateProduction,
  deleteProduction,
} = require("../controllers/productionsControllers");

const router = express.Router();

// 1- get milk productions informations
router.get("/", getProductionsInfos);

// 2- add a production
router.post("/", addProduction);

// 3- update a production
router.patch("/:id", updateProduction);

// 4- delete a production
router.delete("/:id", deleteProduction);

module.exports = router;
