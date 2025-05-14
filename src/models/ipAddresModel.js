import mongoose,{ Schema } from "mongoose";

const ipSchema = new Schema({
    ipAddress: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: Number,
        default: 10,
        min: 0
    }
});

const ipAddressModel = mongoose.model('ip', ipSchema)

const isIpRegistered = async (ip) => {
    const userIpAddress = await ipAddressModel.findOne({
        ipAddress: ip
    });

    return userIpAddress ? true : false
}

const registerUserIpOnDatabase = async (userIpAddress) => {
    const isUserRegistered = await isIpRegistered(userIpAddress);

    if(!isUserRegistered) {
        const newIp = new ipAddressModel({
            ipAddress: userIpAddress
        });

        await newIp.save();

        return { success: 'IP registered successfully.' }
    }

    return { message: 'IP already registered.' }
}

export default { registerUserIpOnDatabase, ipAddressModel};