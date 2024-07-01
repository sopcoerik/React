import mongoose, { Schema, Document } from 'mongoose'

interface IAuthor extends Document {
	name: string
	userId: string
}

const AuthorSchema = new Schema({
	name: { type: String, required: true, unique: true },
	userId: { type: String, required: true, unique: true },
})

export default mongoose.model<IAuthor>('Author', AuthorSchema)
