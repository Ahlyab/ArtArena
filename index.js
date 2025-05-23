require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users.routes");
const authMiddleware = require("./middleware/auth.middleware");
const cookieParser = require("cookie-parser");
const adminValidator = require("./middleware/admin.middleware");
const Artist = require("./models/artist.model");
const ArtistRoutes = require("./routes/artist.routes");
const ClientRoutes = require("./routes/client.routes");
const ArtRoutes = require("./routes/art.routes");
const NotificationRoutes = require("./routes/notification.routes");
const MessagesRoutes = require("./routes/message.routes");
const http = require("http");
const port = process.env.PORT || 3000; // Use port from env or default to 3000
const server = http.createServer(app);
const createSocketInstance = require("./socket/socket");
const io = createSocketInstance(server);

// code for setting up morgan
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const closeExpiredAuctions = require("./controllers/Art/closeExpiredAuctions");

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

// settting up morgan
// Ensure the logs directory exists
const logsDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Create a write stream for the log file
const logStream = fs.createWriteStream(path.join(logsDirectory, "access.log"), {
  flags: "a",
});

// Custom Morgan format function
morgan.format("custom", (tokens, req, res) => {
  const timestamp = new Date().toISOString(); // Get current timestamp in ISO format
  const method = tokens.method(req, res); // HTTP method
  const route = tokens.url(req, res); // Route
  const host = req.headers.host; // Host

  return `[${timestamp}] ${method} ${route} ${host}`;
});

// Setup morgan to log requests to the file
app.use(morgan("combined", { stream: logStream }));
app.use(morgan("custom"));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://art-arena-tau.vercel.app"], //We can pass an Array if we want more than one origins
    credentials: true, //Telling browser that it's safe to include cookies and other credentials in cross-origin requests to the server.
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
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

app.use("/api/art", ArtRoutes);
app.use("/api/messages", MessagesRoutes);

// app.use(authMiddleware);
app.use("/api/artist", ArtistRoutes);
app.use("/api/client", ClientRoutes);
app.use("/api/notifications", NotificationRoutes);

// app.use(adminValidator);
// admin routes

closeExpiredAuctions();

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
