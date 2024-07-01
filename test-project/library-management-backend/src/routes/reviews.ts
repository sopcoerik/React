import { Router, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { getErrorMessage } from '@utils'
import { Review } from '@models'

const reviewsRouter = Router()

// Route to create a new review
reviewsRouter.post('/', async (req: Request, res: Response) => {
	const { user } = req as JwtPayload

	try {
		const review = new Review({
			...req.body,
			userId: user.id,
		})

		await review.save()

		res.status(200).send(review)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to get all reviews
reviewsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const reviews = await Review.find({})

		res.status(200).send(reviews)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to get a single review by ID
reviewsRouter.get('/:id', async (req: Request, res: Response) => {
	try {
		const reviewId = req.params.ID

		const review = await Review.findById(reviewId)

		res.status(200).send(review)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to update a review by ID
reviewsRouter.put('/:id', async (req: Request, res: Response) => {
	try {
		const reviewId = req.params.id

		const review = await Review.findByIdAndUpdate(reviewId)

		res.status(200).send(review)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to delete a review by ID
reviewsRouter.delete('/:id', async (req: Request, res: Response) => {
	const reviewId = req.params.id

	try {
		await Review.findByIdAndDelete(reviewId)

		res.status(201)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

export default reviewsRouter
