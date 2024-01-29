import User from "../models/user.models.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import  jwt from "jsonwebtoken"

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
