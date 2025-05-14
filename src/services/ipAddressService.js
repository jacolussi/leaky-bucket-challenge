import registerUserIpOnDatabase from '../models/ipAddresModel.js';

const ipAddressService = async (ip) => {
    if(ip !== "") {
        const ipAddress = await registerUserIpOnDatabase(ip);

        return ipAddress.success
    }
};

export default ipAddressService;