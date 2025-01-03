const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/e-commerce-db";
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
