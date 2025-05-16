import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ipAddressRouter from "./routes/ipAddressRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config()

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { bufferCommands: false })
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to the database", error)
        process.exit(1)
    }
}

const startServer = async () => {
    await connectDB();
    const server = express();
    server.use(express.json());

    server.get("/", (req, res) => {
        return res.status(200).send("API CONNECTED");
    })

    server.use("/ip", ipAddressRouter);
    server.use("/users", userRouter);

    server.listen(3333, () => {
    console.log("Server running on 3333 port")
    });
}

startServer();