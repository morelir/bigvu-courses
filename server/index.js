const express = require("express");
const cors = require("cors");
const { AppError } = require("./utils/appError");
const courseRouter = require("./routers/courseRouter");
const compression = require('compression');

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());


app.use(express.static("public"));

app.use("/", courseRouter);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
