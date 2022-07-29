import { Router } from "express";
import UsersModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const authRoute = Router();

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).send({ error: "missing username or password " });
  }

  const user = await UsersModel.findOne({ email });
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      //create token
      const token = JWT.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: "20d",
        subject: user.email,
      });

      res.status(200).json({ user: user, token: token });
    } else {
      res.status(400).send({ error: "email or password incorrect" });
    }
  } else {
    res.status(400).send({ error: "email or password incorrect" });
  }
});

export default authRoute;
