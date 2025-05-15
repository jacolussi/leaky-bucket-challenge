import createUser from "../services/userService.js";
import { ipAddressModel } from "../models/ipAddressModel.js";

const registerUser = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        const ipExists = await ipAddressModel.findOne({
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

        const newUser = await createUser(name, email)

        return res.status(201).send({
            message: `User successfully created`,
            user: newUser
        });
    } catch (error) {
        return res.status(500).send({
            message: "FUCKKKK"
        });
    }
}

export default registerUser;