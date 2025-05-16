import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ipAddressRouter from "./routes/ipAddressRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false })
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to the database", error)
        process.exit(1)
    }
}
const server = express();
server.use(express.json());
connectDB();

server.get("/", (req, res) => {
    return res.status(200).send("API CONNECTED");
})

server.use("/ip", ipAddressRouter);
server.use("/users", userRouter);

export default server;

export const startServer = async () => {
    return server.listen(3333, () => {
        console.log("Server running on 3333 port")
    });
}
startServer();