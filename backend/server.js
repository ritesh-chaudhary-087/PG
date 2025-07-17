// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const localityRoutes = require("./routes/localityRoutes");
const rentalDetailsRoutes = require("./routes/rentalDetailsRoutes");
const amenitiesRoutes = require("./routes/amenitiesRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/localities", localityRoutes);
app.use("/api/rental-details", rentalDetailsRoutes);
app.use("/api/amenities", amenitiesRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/schedule", scheduleRoutes);

// Static folder for images (only if not using Cloudinary)
app.use("/uploads", express.static("uploads"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });
