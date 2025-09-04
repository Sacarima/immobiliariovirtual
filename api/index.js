// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import userRouter from './routes/user.route.js'
// import authRouter from './routes/auth.route.js'
// import cookieParser from 'cookie-parser'
// import listingRouter from './routes/listing.route.js'
// import newsletterRoutes from './routes/newsletter.routes.js'
// import contactRoutes from './routes/contact.routes.js'
// import cors from 'cors'
// import path from 'path'
// dotenv.config()

// mongoose.connect(process.env.DB_STRING)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
//   });

//   const __dirname = path.resolve();

// const app = express()
// app.use(cors())

// app.use(cors({
//     origin: 'http://localhost:5173/',
//     credentials: true,
// }))

// app.use(express.json())

// app.use(cookieParser())

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
// })

// app.use('/api/user', userRouter)
// app.use('/api/auth', authRouter)
// app.use('/api/listing', listingRouter)
// app.use('/api/newsletter', newsletterRoutes);
// app.use('/api/contact', contactRoutes)

// app.use(express.static(path.join(__dirname, '../client/dist')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// // middleware for handding errors

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500 
//     const message = err.message || 'Internal Servrer Error'
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     })
// })


// api/index.js
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
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

// --- ESM __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// If index.js is /src/api/index.js and client is /src/client/dist:
const candidateA = path.join(__dirname, '../client/dist')
// If index.js is /api/index.js and client is /client/dist:
const candidateB = path.join(__dirname, 'client/dist')

// Pick the one that exists
const distPath = fs.existsSync(candidateA) ? candidateA : candidateB

// --- DB
mongoose.connect(process.env.DB_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  })

const app = express()

// One CORS config (no trailing slash)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://immobiliario-virtual.onrender.com',
  ],
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

// --- API routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/contact', contactRoutes)

// --- Static (MUST be before catch-all)
// Mount /assets explicitly to guarantee correct MIME
app.use('/assets', express.static(path.join(distPath, 'assets')))
app.use(express.static(distPath))

// --- SPA fallback (exclude /api)
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// --- Error middleware
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({ success: false, statusCode, message })
})

// --- Listen LAST, ensure numeric PORT
const PORT = Number(process.env.PORT) || 10000
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
  console.log('Serving SPA from:', distPath)
})
