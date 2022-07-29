import JWT from "jsonwebtoken";
import UsersModel from "../model/userModel.js";

const authMiddle = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  try {
    if (!authorizationHeader) {
      res.status(403).send({ erro: "Credenciais not found" });
      return;
    }

    const [authorizationType, jwtToken] = authorizationHeader.split(" ");

    if (authorizationType !== "Bearer") {
      res.status(403).send({ erro: "Invalid authorization type" });
    }

    if (!jwtToken) {
      res.status(403).send({ erro: "Invalid token" });
    }

    const tokenPayload = JWT.verify(jwtToken, process.env.PRIVATE_KEY);

    if (!tokenPayload) {
      res.status(403).send({ erro: "Invalid token" });
    }

    const user = { _id: tokenPayload._id, email: tokenPayload.email };
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddle;
