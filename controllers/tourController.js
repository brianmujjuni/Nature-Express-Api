
const fs = require("fs");
const Tour = require('../models/tourModel')

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//   );
  exports.checkID = (req,res,next,val)=>{
    console.log(`Tour is is:${val}`)
    if (req.params.id * 1 > tours.length) {
      
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    next()
  }

  exports.checkBody = (req,res,next)=>{
    
    if(!req.body.name && !req.body.price){
      return res.status(400).json({
        status: 'fail',
        message: 'name and price are required'
      })
    }
    next()
  }
exports.getAllTours = (req, res) => {
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
    
    const tour = tours.find((el) => el.id === req.params.id * 1);
    res.status(200).json({ status: "success", data: { tour } });
  };
  
  exports.createTour = (req, res) => {
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

  
