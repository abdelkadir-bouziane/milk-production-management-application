require("dotenv").config();
const express = require("express");
const cowsRoutes = require("./routes/cowsRoutes");
const testsRoutes = require("./routes/testsRoutes");
const birthsRoutes = require("./routes/birthsRoutes");
const productionsRoutes = require("./routes/productionsRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// cows routes
app.use("/api/cows", cowsRoutes);

// medical tests routes
app.use("/api/tests", testsRoutes);

// births routes
app.use("/api/births", birthsRoutes);

// productions routes
app.use("/api/productions", productionsRoutes);

// listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
