require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const port = process.env.PORT || 3000; // Use port from env or default to 3000

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World API",
      version: "1.0.0",
      description: "A simple Express Hello World API",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
