import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(el){
                return el.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
            },
            message: 'Please enter a valid email'
        }
    },

    password: {
        type: String,
        required: true,
    },

    // confirmPassword: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: function(el){
    //             return el === this.password
    //         },
    //         message: 'Password are not the same'
    //     }
    // },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetTokenExpire: Date,

}, 

    

    {timestamps: true}
) // it let know mongoDB time of user creation and update





userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32,).toString('hex')

    this.passwordResetToken =  crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000

    //console.log(resetToken, this.passwordResetToken)

    return resetToken
}

// Pre-save middleware for hashing password
userSchema.pre('save', async function(next) {
    // Only hash the password if it was modified or is new
    if (this.isModified('password')) {
        this.password = await bcrypt.hashSync(this.password, 12);
    }

    // Set confirmPassword field to undefined
    this.confirmPassword = undefined;
    next(); 


    // Continue with the save operation
    next();

});


const User = mongoose.model('User', userSchema)

export default User