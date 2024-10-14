const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//   );

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      time: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {

    const tour = await Tour.findById(req.params.id);

    res.status(200).json({ status: "success", data: tour });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    })
  }
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
