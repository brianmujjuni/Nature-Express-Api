const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

//1) Middlewares
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) Route handlers or actions
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    time: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: "Fail", message: "Invalid Id" });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ status: "success", data: { tour } });
};

const createTour = (req, res) => {
  const newIdd = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newIdd }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    message: "success",
    data: {
      tour: "Updated tour",
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not yet defined" });
};
//3) Routes


const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users",userRouter);
//4) start the server
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
