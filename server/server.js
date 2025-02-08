const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectToDb");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user-routes");
const companyRoute = require("./routes/company-routes");
const jobRoute = require("./routes/job-routes");

const applicationRoute = require("./routes/application-route");

require("dotenv").config();

//initializing app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//CORS OPTION
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "POST,GET,PUT,PATCH,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

//port
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

//listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
  });
});
