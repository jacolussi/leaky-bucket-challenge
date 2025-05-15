import { createUser } from "../models/userModel.js"

export const createUserOnDb = async (name, email) => {
    try {
        const newUser = await createUser(name,email)
        return newUser;
    } catch (error) {
        console.error("ERRO AQUI, CABEÇA DE PURUNGO", error);
        throw error;
    }
}