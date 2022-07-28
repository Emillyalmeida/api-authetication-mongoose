import { Router } from "express";
import UsersModel from "../model/userModel";
import bcrypt from "bcrypt";

const authRoute = Router();

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).send({ error: "missing username or password " });
  }

  const user = await UsersModel.findOne({ email });
  if (user) {
    const checkPassword = bcrypt.compare(password, user.password);

    if (checkPassword) {
      //create token
    } else {
      res.status(400).send({ error: "email or password incorrect" });
    }
  } else {
    res.status(400).send({ error: "email or password incorrect" });
  }
});
