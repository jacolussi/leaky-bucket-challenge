import { createUserOnDb } from "../services/userService.js";
import { ipAddressModel } from "../models/ipAddressModel.js";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const ipExists = await ipAddressModel.findOne({ ipAddress: ipAddress }, null, { session });

        if(ipExists === null){
            session.commitTransaction();
            return res.status(403).send({
                message: "IP not registered"
            });
        }

        if(ipExists.token === 0) {
            session.commitTransaction();
            return res.status(403).send({
                message: "You do not have enough tokens."
            });
        }

        const { name, email } = req.body || {};

        if(!name || !email) {
            await ipExists.updateOne({ $inc: { token: -1 } }, {session});

            session.commitTransaction();
            return res.status(401).send({
                message: "You must provide the fields to create an user"
            });
        }

        const newUser = await createUserOnDb(name, email, session)

        if(newUser.success) {
            session.commitTransaction();
            return res.status(201).send({
                newUser: newUser,
                message: "User created successfully"
            });
        } else {
            session.commitTransaction();
            return res.status(401).send({
                message: newUser.message
            });
        }
    } catch (error) {
        session.abortTransaction();
        console.error("Transaction aborted due to error:", error);
        return res.status(500).send({
            message: "FUCKKKK",
            error: error.message
        });
    }
}