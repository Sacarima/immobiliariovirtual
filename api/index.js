import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.DB_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const app = express()
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// middleware for handding errors

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500 
    const message = err.message || 'Internal Servrer Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})