import mongoose from 'mongoose';
import ipAddressService from '../services/ipAddressService.js';

export const registerIP = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const ipRegistered = await ipAddressService(ipAddress, session);

        if(ipRegistered.success) {
            await session.commitTransaction();
            console.log("Transaction Commited");
            return res.status(201).send({ message: ipRegistered.newIp });
        } else {
            await session.commitTransaction();
            console.log(ipRegistered.message);
            return res.status(409).send({ message: ipRegistered.message });
        }
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction aborted due to error: ", error);
        return res.status(500).send({ error: "Unknown result from service" });
    }
}