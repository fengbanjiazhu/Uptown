const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const globalErrHandler = require("./Controller/errorController");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const productRoute = require("./Routes/productRoutes");
const orderRoute = require("./Routes/orderRoutes");
// const cartRoute = require("./Routes/cartRoutes");
const measuringRoute = require("./Routes/MeasuringRoute");
const userRoute = require("./Routes/userRoutes");
const bookingRoute = require("./Routes/bookingRoutes");
const subscribeRoute = require("./Routes/subscribeRoutes");
const chatbotRoute = require("./Routes/chatbotRoute");
const blogRoute = require("./Routes/blogRoutes");

app.use(express.static(path.join(__dirname, "Utils")));

// solving CORS issue
// app.use(
//   cors({
//     origin: "https://34c4-1-145-14-101.ngrok-free.app",
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "connect-src": ["'self'", "*"],
      "img-src": ["'self'", "https: data:"],
      "script-src": ["'self'", "https: data:"],
      "frame-src": ["*"],
    },
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
// app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// checking req.query middleware
app.use(function (req, res, next) {
  console.log("Query:", req.query);
  console.log("Params:", req.params);
  // console.log("Body:", req.body);
  next();
});

dotenv.config({ path: "./server/config.env" });

app.use("/api/products", productRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/order", orderRoute);
app.use("/api/measuring", measuringRoute);
app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/blog", blogRoute);

app.use(globalErrHandler);

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    // some options
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("Connection ERROR💥:", err));

// Server
const port = 4000 || process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app running on ${port}...`);
});
