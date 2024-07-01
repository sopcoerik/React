import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@config'
import { IRequestWithUser } from '@types'

// Middleware to verify the token
export const verifyToken = (
	req: IRequestWithUser,
	res: Response,
	next: NextFunction
) => {
	const token = req.header('Authorization')?.replace('Bearer ', '')

	if (!token) {
		return res.status(401).send('Access denied. No token provided.')
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		res.status(400).send('Invalid token.')
	}
}
