import createUser from "../models/userModel.js"

const createUserOnDb = async (name, email) => {
    if(name !== "" && email !== "") {
        const newUser = await createUser(name,email)

        return newUser;
    }
}

export default createUserOnDb;