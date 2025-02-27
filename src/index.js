const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const announceRoutes = require("./routes/announceRoutes");
const divisionRoutes = require("./routes/divisionRoutes");
const errorHandler = require("./middlewares/errorHandler");
const tagRoutes = require("./routes/tagRoutes");
const port = process.env.port;
const host = process.env.host;
const cors = require("cors");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/divisions", divisionRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/announces", announceRoutes);
app.use("/tag", tagRoutes);
app.use(errorHandler);
app.use(cors());

app.listen(port, "0.0.0.0", () => {
  console.log(`berhasil cuy ${host}${port}`);
});
