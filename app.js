const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
});

app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: "Fail", message: "Invalid Id" });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ status: "success", data: { tour } });
});

app.patch("/api/v1/tours/:id", (req, res) => {
  if(req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(200).json({
    message: "success",
    data: {
      tour: "Updated tour",
    },
  });
});

app.delete("api/v1/tours/:id",(req,res)=>{
  if(req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(204).json({
    status: "Success",
    data: null
  })
})


const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
