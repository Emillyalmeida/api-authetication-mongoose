import { Router } from "express";
import UsersModel from "../model/userModel.js";

const userRoute = Router();

userRoute.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const query = {};

  if (!id) {
    return res.status(400).send({ error: "missing params id" });
  }

  try {
    const users = await UsersModel.find(query);
    res.send({ users });
  } catch (error) {
    res.status(400).send({ error: "Failed to find user" });
  }
});

userRoute.post("/users", async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).send({ error: "missing usernme, password or email" });
  }

  if (password.length < 6) {
    res.status(400).send({ error: "password need min 6 characters" });
  }

  try {
    const user = new UsersModel({
      username: username,
      password: password,
      email: email,
    });
    await user.save();

    res.status(201).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
});

userRoute.put("/users/:id", async (req, res, next) => {});

export default userRoute;
