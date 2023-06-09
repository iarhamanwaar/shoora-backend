require("dotenv").config();

const express = require("express");
const app = express();

// connecting to db
require("./database/connection");

// importing middleware
const bodyParserMiddleware = require("./middleware/body-parser");
bodyParserMiddleware(app);
const helmetMiddleware = require("./middleware/helmet");
helmetMiddleware(app);
const corsMiddleware = require("./middleware/cors");
corsMiddleware(app);
const compressionMiddleware = require("./middleware/compression");
compressionMiddleware(app);
const morganMiddleware = require("./middleware/morgan");
morganMiddleware(app);

// configure to use routers
const adminRouter = require("./routes/admin.router");
const superAdminRouter = require("./routes/superAdmin.router");
const clientRouter = require("./routes/client.router");
const consultantRouter = require("./routes/consultant.router");

app.use("/admin", adminRouter);
app.use("/superadmin", superAdminRouter);
app.use("/client", clientRouter);
app.use("/consultant", consultantRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "success",
    data: `Welcome to Shoora ${process.env.NODE_ENV} APIs`,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
