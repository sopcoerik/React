import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '@models'
import favoritesRouter from './favorites'
import { getErrorMessage } from '@utils'
import { IRequestWithUser } from '@types'
import { JWT_SECRET } from '@config'
import { verifyToken } from '@middleware'

const usersRouter = Router()

// Route to get user details
usersRouter.get(
	'/:userId',
	verifyToken,
	async (req: Request, res: Response) => {
		try {
			const user = await User.findById(req.params.userId).select(
				'-password'
			)
			if (!user) {
				return res.status(404).send('User not found')
			}
			res.send(user)
		} catch (error) {
			res.status(500).send(getErrorMessage(error))
		}
	}
)

// Route to create a new user
usersRouter.post('/', async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body

		// Check if user already exists
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).send('User already exists')
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
		})
		console.log(req.body)
		await newUser.save()
		res.status(201).send(newUser)
	} catch (error) {
		console.log(error)
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to authenticate user
usersRouter.post('/login', async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		console.log(req.body)
		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).send('User not found')
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).send('Invalid credentials')
		}

		const userForToken = {
			id: user._id,
			email: user.email,
			username: user.username,
		}

		const token = jwt.sign(userForToken, JWT_SECRET)

		const responsePayload = {
			user: userForToken,
			token,
		}

		res.status(201).send(responsePayload)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Nest the favoritesRouter within usersRouter
usersRouter.use(
	'/:userId/favorites',
	verifyToken,
	(_req: IRequestWithUser, _res: Response, next) => {
		next()
	},
	favoritesRouter
)

export default usersRouter
