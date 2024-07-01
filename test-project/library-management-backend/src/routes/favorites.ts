import { JwtPayload } from 'jsonwebtoken'

import { getErrorMessage } from '@utils'
import { Favorite } from '@models'
import { IRequestWithUser } from '@types'
import { Router, Response } from 'express'

const favoritesRouter = Router()

// Route to add a book to user's favorites
favoritesRouter.post('/', (req: IRequestWithUser, res: Response) => {
	const { user } = req as JwtPayload
	const { bookId } = req.body

	try {
		const favoriteBookOfUser = new Favorite({
			userId: user.id,
			bookId,
		})
		res.status(201).send(favoriteBookOfUser)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to get all favorite books of a user
favoritesRouter.get('/', async (req: IRequestWithUser, res: Response) => {
	const { user } = req as JwtPayload

	try {
		const favoriteBooksForUser = await Favorite.find({ userId: user._id })

		res.status(200).send(favoriteBooksForUser)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to remove a book from user's favorites by ID
favoritesRouter.delete('/:id', async (req: IRequestWithUser, res: Response) => {
	const favoriteId = req.params.id

	try {
		await Favorite.findByIdAndDelete(favoriteId)

		res.status(201)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

export default favoritesRouter
