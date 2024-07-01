import mongoose, { Schema, Document } from 'mongoose'

interface IReview extends Document {
	userId: string
	bookId: string
	text: string
	rating: string
}

const ReviewSchema = new Schema({
	userId: { type: String, required: true },
	bookId: { type: String, required: true },
	text: { type: String, required: true },
	rating: { type: Number },
})

export default mongoose.model<IReview>('Review', ReviewSchema)
