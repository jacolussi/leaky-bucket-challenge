import mongoose from "mongoose";
import request from "supertest";
import { ipAddressModel } from "../src/models/ipAddressModel";
import dotEnv from "dotenv";
import { startServer } from "../src/server.js";
dotEnv.config();
let server;
describe('Atomicity test - Invalid payloads should decrement tokens', () => {
    beforeAll(async () => {
        server = startServer();

        await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
        await mongoose.connection.asPromise();
        await ipAddressModel.deleteMany({});

        await ipAddressModel.create({
            ipAddress: "127.0.0.1",
            token: 10
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should decrement token only on invalid requests and prevent race conditins', async () => {
        const concurrentRequests = [];

        for(let i = 0; i < 20; i++) {
            concurrentRequests.push(
                request(httpServer)
                .post("/users")
                .set('x-forwarded-for', '127.0.0.1')
                .send({ name: '', email: '' })
            )
        }

        const responses = await Promise.all(concurrentRequests);

        const decrementedTokenRequests = responses.filter(r => r.status === 401);
        const blockedRequests = responses.filter(r => r.status === 403);

        expect(decrementedTokenRequests.length).toBe(10);
        expect(blockedRequests.length).toBe(10);

        const finalDBState = await ipAddressModel.findOne({ ipAddress: '127.0.0.1' });
        expect(finalDBState.token).toBe(0);
    });
});
