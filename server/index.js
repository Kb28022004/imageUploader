const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./database/connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const imageRouter = require("./routes/imageRoute");

const path = require("path");

const app = express();
dotenv.config();

//middlware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
app.use(cookieParser());

app.use("/api/v1/image", imageRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
   app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

  } catch (error) {
    console.log(error);
  }
};

start();
