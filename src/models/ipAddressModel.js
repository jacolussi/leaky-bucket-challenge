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

const isIpRegistered = async (ip, session) => {
    const userIpAddress = await ipAddressModel.findOne({
        ipAddress: ip
    }, [session]);

    if(userIpAddress !== null) {
        return true;
    }

    return false;
}

export const registerUserIpOnDatabase = async (userIpAddress, session) => {
    const isUserRegistered = await isIpRegistered(userIpAddress, session);

    if(isUserRegistered === false) {
        const newIp = new ipAddressModel({
            ipAddress: userIpAddress
        });

        await newIp.save({ session });

        return { success: true, newIp: newIp }
    }

    return { success: false, message: 'IP already registered.' }
}