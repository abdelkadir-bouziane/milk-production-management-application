const express = require("express");
const {
  getTestsInfos,
  addTest,
  updateTest,
  deleteTest,
} = require("../controllers/testsControllers");

const router = express.Router();

// 1- get medical tests informations
router.get("/", getTestsInfos);

// 2- add a medical test
router.post("/", addTest);

// 3- update a medical test
router.patch("/:id", updateTest);

// 4- delete a medical test
router.delete("/:id", deleteTest);

module.exports = router;
