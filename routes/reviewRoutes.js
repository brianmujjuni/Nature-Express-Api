const express = require("express");

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserId,
  getReview,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(protect, getAllReviews)
  .post(protect, restrictTo("user"), setTourUserId, createReview);
router
  .route("/:id")
  .delete(protect, deleteReview)
  .patch(protect, updateReview)
  .get(protect, getReview);
module.exports = router;
