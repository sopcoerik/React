import { Router, Request, Response } from 'express'

import { verifyToken } from '@middleware'
import { Category } from '@models'
import { JwtPayload } from 'jsonwebtoken'
import { IRequestWithUser } from '@types'
import { getErrorMessage } from '@utils'

const categoriesRouter = Router()

// Route to add a book category
categoriesRouter.post(
	'/',
	verifyToken,
	async (req: IRequestWithUser, res: Response) => {
		try {
			const { name } = req.body

			const category = new Category({
				name,
				userId: (req.user as JwtPayload)?.id,
			})

			await category.save()

			res.status(201).send(category)
		} catch (error) {
			res.status(400).send(getErrorMessage(error))
		}
	}
)

// Route to get all book categories
categoriesRouter.get('/', async (req: Request, res: Response) => {
	try {
		const authors = await Category.find({})

		res.status(200).send(authors)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to remove a category from categories by ID
categoriesRouter.delete(
	'/:id',
	verifyToken,
	async (req: Request, res: Response) => {
		const categoryId = req.params.id

		try {
			await Category.findByIdAndDelete(categoryId)

			res.status(203)
		} catch (error) {
			res.status(400).send(getErrorMessage(error))
		}
	}
)

export default categoriesRouter
