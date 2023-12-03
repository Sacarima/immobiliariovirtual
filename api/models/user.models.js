import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    }
}, {timestamps: true}) // it let know mongoDB time of user creation and update

const User = mongoose.model('User', userSchema)

export default User