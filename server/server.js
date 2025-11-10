const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectToDb");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user-routes");
const companyRoute = require("./routes/company-routes");
const jobRoute = require("./routes/job-routes");
const contactRoute = require("./routes/Contact-Us-route");
const applicationRoute = require("./routes/application-route");
require("dotenv").config();
const redis = require("./utils/redis"); // initialize once here

// Initializing app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://talentnestpro.netlify.app",
  "https://talentnest-pro.vercel.app",
];

// CORS OPTION
const corsOptions = {
  origin: allowedOrigins,
  methods: "POST,GET,PUT,PATCH,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Port
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/contact", contactRoute);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
  });

  // Start cron job AFTER the server starts
  require("./utils/cronJob");
});
