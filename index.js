require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");

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
  apis: ["./Routes/*.js"],
};

app.use(cors());

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", require("./Routes/users"));

/**
 * @swagger
 * /:
 *  get:
 *    summary: Returns the hello world message
 *    description: Returns the hello world message
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get("/", (req, res) => {
  // redirect to api-docs
  res.redirect("/api-docs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
