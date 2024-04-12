import User from "../models/user.models.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import  jwt from "jsonwebtoken"
import sendEmail from "../utils/email.js"
import crypto from 'crypto'

export const signup = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body

    // Check if any of the required fields is empty
    if (!username || !email || !password) {
        return next(errorHandler(400, 'Please fill in all fields'))
    } else if (password.length < 8) { // Check if password is at least 8 characters long  
        return next(errorHandler(400, 'Password must be at least 8 characters long'))  
    } else if (username.length < 3) { // Check if username is at least 3 characters long
        return next(errorHandler(400, 'Username must be at least 3 characters long')) 
    } else if (!email.includes('@')) { // Check if email is valid 
        return next(errorHandler(400, 'Please enter a valid email address'))
    } else if (username.includes(' ')) { // Check if username contains spaces 
        return next(errorHandler(400, 'Username cannot contain spaces'))
    }


     // Check if password and confirmation match
      if (password !== confirmPassword) {
          return next(errorHandler(400, 'Passwords do not match')) 
      }

    // Check if user already exists in the database 
    const user = await User.findOne({ email }) 
    if (user) { 
        return next(errorHandler(400, 'User already exists!'))
    }
    
    // Hash the password  
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
   
    try{
        await newUser.save()
        res.status(201).json('User created successfully!')
        
    } catch(error) {
        next(error)
    }
    
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(errorHandler(400, 'Please fill in all fields'))
    }

    try {
      const validUser = await User.findOne({ email }) 
      if (!validUser) return next(errorHandler(404, 'User not found!'))

      const validPassword = bcryptjs.compareSync(password, validUser.password)
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'))

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = validUser._doc
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    } catch (error) {
      next(error)
    }
  }

  export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = user._doc
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest)
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        })
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = newUser._doc
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest)
      }
    } catch (error) {
      next(error)
    }
  }

  export const signOut = async (req, res, next) => {
    
    try {
      res.clearCookie('access_token').json({ message: 'Sign out successfully!' })
    } catch (error) {
      next(error)
    }
  }

  export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return next(new Error('Please fill in all fields', 400));
    }
    let user;
    try {
        // 1) Get user based on POSTed email
         user = await User.findOne({ email });

        if (!user) {
          return next(new Error('User not found!', 404));
        }
        // 2) Generate the random reset token
        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        
        // 3) Send it to user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password and confirm your password to: \n\n${resetURL}.
                      \n\nThis link will only be valid for 10 minutes.\n\nIf you didn't forget your password, please ignore this email!`;

        await sendEmail({
            email: user.email,
            subject: 'Reset password link',
            message,
        });

        res.status(200).json({
            status: 'success',
            message: 'Password reset link sent to email!',
        });

    } catch (error) {
        console.error("Error in forgotPassword:", error);

        if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }

        next(new Error('There was an error sending the email. Try again later!', 500));
    }
};

  
  export const resetPassword = async (req, res, next) => {
    // 1) Get user based on the token
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() },
    })
    if (!user) {
      const error = new Error('Token is invalid or has expired!', 400)
      return next(error)
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new Error('Passwords do not match!', 400));
  }
  // 2) If token has not expired, and there is user, set the new password
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetTokenExpire = undefined
    user.passwordChangedAt = Date.now()

    await user.save()

    // 4) Log the user in, send JWT
    const singInToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.status(200).json({ token: singInToken, message: 'Password reset successfully!'})

  }
