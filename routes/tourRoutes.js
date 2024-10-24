const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");
// const { createReview } = require("../controllers/reviewController");

const router = express.Router();
//nested create review route
router.use("/:tourId/reviews", reviewRouter);

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);
router.route("/tour-stats").get(getTourStats);
router.route("/monthly-plan/:year").get(getMonthlyPlan);
router
  .route("/")
  .get(protect, restrictTo("admin", "lead-guide", "user"), getAllTours)
  .post(createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo("admin"), deleteTour);

module.exports = router;
