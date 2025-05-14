import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import ipAdressRouter from "./routes/ipAddressRoute.js"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const mongoURI = process.env.MONGODB_URI;

const User = mongoose.model('user', userSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to the database", error)
        process.exit(1)
    }
}

connectDB()
const server = express();
server.use(express.json());
server.use("/", ipAdressRouter)

server.listen(3333, () => {
    console.log("Server running on 3333 port")
});

server.post("/users", async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        const ipExists = await IP.findOne({
            ipAddress: ipAddress
        });

        if(ipExists.token === 0) {
            return res.status(403).send({
                message: "You do not have enough tokens."
            });
        }

        if(!ipExists){
            return res.status(403).send({
                message: "IP not registered"
            });
        }

        const { name, email } = req.body;

        if(name === "" || email === "") {
            await ipExists.updateOne({
                token: ipExists.token -1
            });

            return res.status(401).send({
                message: "You must provide corretly de fields to create an user"
            });
        }

        const newUser = await User.create({
            name: name,
            email: email
        });


        return res.status(201).send({
            message: `User successfully created`,
            user: newUser
        });
    } catch (error) {
        return res.status(500).send({
            message: "FUCKKKK"
        });
    }
});