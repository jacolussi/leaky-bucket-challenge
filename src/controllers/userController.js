import { createUserOnDb } from "../services/userService.js";
import { ipAddressModel } from "../models/ipAddressModel.js";

export const registerUser = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const { name, email } = req.body || {};

        try {
            const ipExists = await ipAddressModel.findOne({ ipAddress: ipAddress });

            if(ipExists === null) {
                return res.status(403).send({
                    message: "IP not registered"
                });
            }

            if(!name || !email) {
                const updatedResult = await ipAddressModel.updateOne(
                    {
                        ipAddress: ipAddress,
                        token: { $gt: 0 }
                    },
                    {
                        $inc: { token: -1 }
                    }    
                );

                if(updatedResult.matchedCount === 0) {
                    return res.status(403).send({
                    message: "You do not have enough tokens."
                });
            }
                return res.status(401).send({
                    message: "You must provide the fields to create an user"
                });
            }


            const newUser = await createUserOnDb(name, email, session)

            if(newUser.success) {
                return res.status(201).send({
                    newUser: newUser,
                    message: "User created successfully"
                });
            } else {
                return res.status(401).send({
                    message: newUser.message
                });
            }
        } catch (error) {
            return res.status(500).send({
                message: "FUCKKKK",
                error: error.message
            });
        }
}