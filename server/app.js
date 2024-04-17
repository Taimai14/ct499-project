const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const staffRouter = require("./app/routes/staff.route");
const UserRouter = require("./app/routes/user.route");
const BookRouter = require("./app/routes/book.route");
const AuthorRouter = require("./app/routes/author.route");
const BorrowRouter = require("./app/routes/borrow.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/staffs", staffRouter);
app.use("/api/user", UserRouter);
app.use("/api/books", BookRouter);
app.use("/api/authors", AuthorRouter);
app.use("/api/borrow", BorrowRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => [res.send({ message: "Welcome to libary." })]);

module.exports = app;
