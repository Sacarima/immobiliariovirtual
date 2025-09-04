import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listing.route.js'
import newsletterRoutes from './routes/newsletter.routes.js'
import contactRoutes from './routes/contact.routes.js'
import cors from 'cors'
import path from 'path'
dotenv.config()

mongoose.connect(process.env.DB_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

  const __dirname = path.resolve();

const app = express()
app.use(cors())

app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true,
}))

app.use(express.json())

app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes)

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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