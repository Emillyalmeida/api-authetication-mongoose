import { Router } from "express";
import UsersModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
const userRoute = Router();

userRoute.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "missing params id" });
  }

  try {
    const users = await UsersModel.find({ _id: id });
    res.send({ users });
  } catch (error) {
    res.status(400).send({ error: "Failed to find user" });
  }
});

userRoute.post("/users", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).send({ error: "missing usernme, password or email" });
  }

  if (password.length < 6) {
    res.status(400).send({ error: "password need min 6 characters" });
  }

  const newPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = new UsersModel({
      username: username,
      password: newPassword,
      email: email,
    });
    await user.save();

    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send({ erro: "it email already register" });
  }
});

userRoute.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "missing params id" });
  }
  try {
    const updateUser = await UsersModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updateUser) {
      res.status(400).send({ error: "Could not update the user" });
    }

    res.status(201).send({ user: updateUser });
  } catch (error) {
    res.send(error);
  }
});

export default userRoute;