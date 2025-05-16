import ipAddressService from '../services/ipAddressService.js';

export const registerIP = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        const ipRegistered = await ipAddressService(ipAddress);

        if(ipRegistered.success) {
            return res.status(201).send({ message: ipRegistered.newIp });
        } else {
            return res.status(409).send({ message: ipRegistered.message });
        }

    } catch (error) {
        return res.status(500).send({ error: "Unknown result from service" });
    }
}