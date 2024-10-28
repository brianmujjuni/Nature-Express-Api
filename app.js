const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//server static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, "public")));

//Set Securuty HTTP header
app.use(helmet());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//limit request from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too may requests from this Ip,please try again in an hour",
});

app.use("/api", limiter);

//BODY PARSER
app.use(express.json({ limit: "10kb" }));

//data sanitization against NoSql query injection
app.use(mongoSanitize());
//Data sanitization against XsS
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.get("/", (req, res) => {
  res
    .status(200)
    .render("base", { tour: "Mujjuni Brian", developer: "Project Code" });
});

app.get('/overview',(req,res)=>{
  res.status(200).render('overview',{
    title: "All Tours"
  })
})

app.get('/tour',(req,res)=>{
  res.status(200).render('tour',{
    title: "The Forest Hiker Tour"
  })
})

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
