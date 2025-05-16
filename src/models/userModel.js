import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('user', userSchema);

const userExists = async (email, session) => {
    const user = await User.findOne({
        email: email
    }, [session]);

    if(user !== null) {
        return true;
    }

    return false;
}

export const createUser = async (name, email, session) => {
    const user = await userExists(email, session);

    if(!user) {
        const newUser = new User({
            name: name,
            email: email
        });

        await newUser.save({ session });

        return { success: true, message: newUser }
    }

    return { success: false, message: "User already have an account" }
}