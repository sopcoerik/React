export type Author = {
	id: string
	name?: string
	createdById?: string
}

export type TBook = {
	id?: string
	authorId: string
	title: string
	description?: string
	categoryId: string
	author?: string
	createdById?: string
}

export type FetchAuthorsResponse = Author[]

export type FetchBooksParams = {
	term?: string
	catId?: string
	sortBy?: string
	order?: 'asc' | 'desc'
	page?: number
}

export type TReview = {
	id: string
	userId: string
	bookId: string
	text: string
	rating: number
	createdById: string
}

export type ReviewPayload = {
	userId?: string
	bookId: string
	text: string
	rating?: number
	createdById: string
}

export type EditReviewParams = {
	id: string
	newReview: ReviewPayload
}

export type TFavorite = {
	id: string
	userId: string
	bookId: string
}

export type FetchFavoritesParams = {
	userId: string
}

export type AddFavoritePayload = {
	userId: string
	bookId: string
}

export type DeleteFavoriteParams = {
	userId: string
	favoriteId: string
}

export type TCategory = {
	id: string
	name?: string
	createdById?: string
}

export type CategoryPayload = {
	name: string
	createdById: string
}

export type TUser = {
	userId: string
	email: string
}

export type UserPayload = {
	userId: string
	email: string
}

export type UpdateUserParams = {
	id: string
	updatedUser: UserPayload
}

export type TSortingState = {
	[k: string]: 'asc' | 'desc'
}
