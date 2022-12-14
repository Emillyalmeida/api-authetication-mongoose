import "dotenv/config";
import express from "express";
import DBconection from "./db/db.js";
import authRoute from "./route/AuthRoute.js";
import userRoute from "./route/UserRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log(" app is running in the port 5000");
});

DBconection.Conection();

app.use(userRoute);
app.use(authRoute);
