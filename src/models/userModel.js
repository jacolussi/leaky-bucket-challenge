import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', userSchema);

const userExists = async (email) => {
    const user = await User.findOne({
        email: email
    });

    if(user !== null) {
        return true;
    }

    return false;
}

export const createUser = async (name, email) => {
    const user = await userExists(email);

    if(!user) {
        const newUser = new User({
            name: name,
            email: email
        });

        await newUser.save();

        return { success: true, message: newUser }
    }

    return { success: false, message: "User already have an account" }
}