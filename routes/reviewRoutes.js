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
router.use(protect)
router
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setTourUserId, createReview);
router
  .route("/:id")
  .delete(deleteReview)
  .patch(updateReview)
  .get(getReview);
module.exports = router;
