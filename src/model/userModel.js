import Mongoose from "mongoose";

const shemaUser = Mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const UsersModel = Mongoose.model("Users", shemaUser);

export default UsersModel;
