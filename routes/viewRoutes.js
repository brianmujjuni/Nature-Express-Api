const express = require("express");
const {
  getOverview,
  getTour,
  getLoginFrom,
} = require("../controllers/viewsController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.get("/", getOverview);
router.get("/tour/:slug",getTour);
router.get("/login", getLoginFrom);

module.exports = router;
