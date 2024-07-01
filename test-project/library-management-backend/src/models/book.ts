import mongoose, { Schema, Document } from 'mongoose'

interface IBook extends Document {
	title: string
	author: string
	description: string
	categoryId: string
	userId: string
}

const BookSchema: Schema = new Schema({
	title: { type: String, required: true, unique: true },
	author: { type: String, required: true },
	description: { type: String },
	categoryId: { type: String, required: true },
	userId: { type: String, required: true },
})

export default mongoose.model<IBook>('Book', BookSchema)
