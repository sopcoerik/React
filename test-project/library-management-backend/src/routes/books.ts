import { Router, Request, Response } from 'express'

import { verifyToken } from '@middleware'
import { Book } from '@models'
import { JwtPayload } from 'jsonwebtoken'
import { IRequestWithUser } from '@types'
import { getErrorMessage } from '@utils'

const booksRouter = Router()

// Route to create a new book
booksRouter.post(
	'/',
	verifyToken,
	async (req: IRequestWithUser, res: Response) => {
		try {
			const book = new Book({
				...req.body,
				userId: (req.user as JwtPayload).username,
			})

			res.status(201).send(book)

			await book.save()
		} catch (error) {
			res.status(400).send(getErrorMessage(error))
		}
	}
)

// Route to get all books
booksRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const books = await Book.find()

		res.status(200).send(books)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}

	res.send('List of books')
})

// Route to get a single book by ID
booksRouter.get('/:id', verifyToken, async (req: Request, res: Response) => {
	try {
		const bookId = req.params.id

		const book = await Book.findById(bookId)

		res.status(200).send(book)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to update a book by ID
booksRouter.put('/:id', verifyToken, async (req: Request, res: Response) => {
	const bookId = req.params.id

	try {
		const book = await Book.findByIdAndUpdate(bookId)

		res.status(202).send(book)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

// Route to delete a book by ID
booksRouter.delete('/:id', verifyToken, async (req: Request, res: Response) => {
	const bookId = req.params.id
	try {
		await Book.findByIdAndDelete(bookId)

		res.status(201)
	} catch (error) {
		res.status(400).send(getErrorMessage(error))
	}
})

export default booksRouter
