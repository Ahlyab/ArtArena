require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./Routes/users");

const port = process.env.PORT || 3000; // Use port from env or default to 3000

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Art Arena API",
      version: "1.0.0",
      description: "A simple Express Hello World API",
    },
    servers: [
      {
        // get url that is used in

        url: `http://localhost:${port}`,
      },
      {
        url: "https://artarena.onrender.com/",
      },
    ],
  },
  apis: ["./docs/*.js"],
};

app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", users);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(
        `App is listening to port : ${port} \n http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.log("uri : " + process.env.DB_URL);
    console.log(error);
  });
