import { Router, Response, Request } from 'express'

import { verifyToken } from '@middleware'
import { Author } from '@models'
import { IRequestWithUser } from '@types'
import { JwtPayload } from 'jsonwebtoken'
import { getErrorMessage } from '@utils'

const authorsRouter = Router()

// Route to add a book author
authorsRouter.post(
	'/',
	verifyToken,
	async (req: IRequestWithUser, res: Response) => {
		try {
			const { name } = req.body

			const author = new Author({
				name,
				userId: (req.user as JwtPayload)?.id,
			})

			await author.save()

			res.status(201).send(author)
		} catch (error) {
			res.status(400).send(getErrorMessage(error))
		}
	}
)

// Route to get all book authors
authorsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const authors = await Author.find({})

		res.status(200).send(authors)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to remove a author from authors by ID
authorsRouter.delete(
	'/:id',
	verifyToken,
	async (req: Request, res: Response) => {
		const authorId = req.params.id

		try {
			await Author.findByIdAndDelete(authorId)

			res.status(203)
		} catch (error) {
			res.status(400).send(getErrorMessage(error))
		}
	}
)

export default authorsRouter
