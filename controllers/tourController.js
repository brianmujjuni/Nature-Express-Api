const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//   );

exports.getAllTours = async(req, res) => {
  const tours = await Tour.find()
  res.status(200).json({
    status: "success",
    time: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {

  res.status(200).json({ status: "success", data: "" });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "Sucess",
      data: {
        newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    message: "success",
    data: {
      tour: "Updated tour",
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
