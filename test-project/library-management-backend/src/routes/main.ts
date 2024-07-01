import { Router } from 'express'
import {
	authorsRouter,
	booksRouter,
	categoriesRouter,
	reviewsRouter,
	usersRouter,
} from '@routes'
import { verifyToken } from '@middleware'

const router = Router()

router.get('/', (_req, res) => {
	res.send('Library Management API')
})

router.use('/books', booksRouter)
router.use('/categories', categoriesRouter)
router.use('/users', usersRouter)
router.use('/authors', authorsRouter)
router.use('/reviews', verifyToken, reviewsRouter)

export default router
