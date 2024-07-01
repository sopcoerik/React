import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { MONGODB_URI } from '@config'

const app = express()
const PORT = process.env.PORT || 3002

const connectToDB = async () => {
	await mongoose.connect(MONGODB_URI)
	console.log('Connected to MongoDB database')
}

try {
	connectToDB()
} catch (error) {
	console.error('Error connecting to MongoDB database: ', error)
}

app.use(cors())

// Middleware
app.use(express.json())

// Routes
import { libraryManagementRouter } from '@routes'

app.use('/api', libraryManagementRouter)

// Health Check route
app.get('/', (_req: Request, res: Response) => {
	res.send('Server is running!')
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
