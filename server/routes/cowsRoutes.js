const express = require("express");
const {
  getCowsInfos,
  addCow,
  updateCow,
  deleteCow,
} = require("../controllers/cowsControllers");

const router = express.Router();

// 1- get cows informations
router.get("/", getCowsInfos);

// 2- add a cow
router.post("/", addCow);

// 3- update a cow
router.patch("/:id", updateCow);

// 4- delete a cow
router.delete("/:id", deleteCow);

module.exports = router;
