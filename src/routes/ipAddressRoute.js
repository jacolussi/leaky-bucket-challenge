import express from "express";
import registerIP from "../controllers/ipAddressController.js";

const ipAddressRouter = express.Router();

ipAddressRouter.get("/", async (req, res) => { registerIP(req, res) });

export default ipAddressRouter;