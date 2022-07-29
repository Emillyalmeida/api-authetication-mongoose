import { Router } from "express";
import UsersModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import authMiddle from "../middlewares/authMiddleware.js";

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
    res.status(400).send({ erro: "Email already exists" });
  }
});

userRoute.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "missing params id" });
  }

  if (req.body.password) {
    const newPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = newPassword;
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
    res.status(400).send({ error: "Could not update the user, verify id" });
  }
});

userRoute.delete("/users/:id", authMiddle, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "missing params id" });
  }

  try {
    const deletedUser = await UsersModel.deleteOne({ _id: id });

    if (deletedUser.deletedCount) {
      return res.status(200).send("excluded user");
    }

    res.status(400).send({ error: "Could not delete the user" });
  } catch (error) {
    res.status(400).send({ error: "Could not delete the user, verify id" });
  }
});

export default userRoute;
