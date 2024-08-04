require("dotenv").config();

const connectDb = require("./utils/db");

const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");

const app = express();
const authRoute = require("./router/auth-router")
const adminRoute = require("./router/admin-router")
const userRoute = require("./router/user-router");

////middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());


//middleware - needed to allow json transfer
app.use(express.json());

//mount router
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);




connectDb().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`server sundai xa yo port ma : ${PORT}`);
  });
});
