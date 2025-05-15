import { registerUserIpOnDatabase } from '../models/ipAddressModel.js';

const ipAddressService = async (ip) => {
    try {
        const ipAddress = await registerUserIpOnDatabase(ip);
        return ipAddress;
    } catch (error) {
        console.error("ERRO AQUI NESSA MERDA", error);
        throw error;
    }
};

export default ipAddressService;