const express = require("express");
const {
  getBirthsInfos,
  addBirth,
  updateBirth,
  deleteBirth,
} = require("../controllers/birthsControllers");

const router = express.Router();

// 1- get births informations
router.get("/", getBirthsInfos);

// 2- add a birth
router.post("/", addBirth);

// 3- update a birth
router.patch("/:id", updateBirth);

// 4- delete a birth
router.delete("/:id", deleteBirth);

module.exports = router;
