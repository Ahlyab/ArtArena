require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./Routes/users");
const authMiddleware = require("./Middleware/AuthMiddleware");
const cookieParser = require("cookie-parser");
const adminValidator = require("./Middleware/adminMiddleware");
const Artist = require("./Model/Artist");
const ArtistRoutes = require("./Routes/ArtistOperations");
const ClientRoutes = require("./Routes/ClientOperations");
const ArtRoutes = require("./Routes/ArtOperations");
const NotificationRoutes = require("./Routes/NotificationOperations");
const http = require("http");
const port = process.env.PORT || 3000; // Use port from env or default to 3000
const server = http.createServer(app);
const createSocketInstance = require("./socket");
const io = createSocketInstance(server);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Art Arena API",
      version: "1.0.0",
      description: "Art Arena API Documentation",
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

// app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://art-arena-tau.vercel.app"], //We can pass an Array if we want more than one origins
    credentials: true, //Telling browser that it's safe to include cookies and other credentials in cross-origin requests to the server.
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", users);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route" });
});

app.use("/api/art", ArtRoutes);

app.use(authMiddleware);
app.use("/api/artist", ArtistRoutes);
app.use("/api/client", ClientRoutes);
app.use("/api/notifications", NotificationRoutes);

// app.use(adminValidator);
// admin routes

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.DB_URL_LATEST
      : process.env.DB_URL
  )
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
