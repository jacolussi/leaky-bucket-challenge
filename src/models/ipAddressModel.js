import mongoose,{ Schema } from "mongoose";

const ipSchema = new Schema({
    ipAddress: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: Number,
        default: 10,
        min: 0
    }
});

export const ipAddressModel = mongoose.model('ip', ipSchema)

const isIpRegistered = async (ip) => {
    const userIpAddress = await ipAddressModel.findOne({
        ipAddress: ip
    });

    if(userIpAddress !== null) {
        return true;
    }

    return false;
}

export const registerUserIpOnDatabase = async (userIpAddress) => {
    const isUserRegistered = await isIpRegistered(userIpAddress);

    if(isUserRegistered === false) {
        const newIp = new ipAddressModel({
            ipAddress: userIpAddress
        });

        await newIp.save();

        return { success: true, newIp: newIp }
    }

    return { success: false, message: 'IP already registered.' }
}