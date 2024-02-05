import mongoose from 'mongoose'
import crypto from 'crypto'
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
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      },
      passwordResetToken: String,
      passwordResetTokenExpire: Date,

}, 

    

    {timestamps: true}
) // it let know mongoDB time of user creation and update


userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32,).toString('hex')

    this.passwordResetToken =  crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000

    console.log(resetToken, this.passwordResetToken)

    return resetToken
}
const User = mongoose.model('User', userSchema)

export default User