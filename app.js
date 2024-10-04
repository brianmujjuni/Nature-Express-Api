const express = require("express");

const app = express();

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({ message: "Hello from the server", app: "Natures" });
});

app.post("/api/v1/tours", (req, res) => {
  res.status(201).json({ message: "You can post to this endpoint...." });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
