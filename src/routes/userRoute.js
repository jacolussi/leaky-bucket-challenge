import express from "express";
import registerUser from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post("/", async (req, res) => { registerUser(req, res)} )

export default userRouter;