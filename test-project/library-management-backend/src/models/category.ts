import mongoose, { Schema, Document } from 'mongoose'

interface ICategory extends Document {
	name: string
	userId: string
}

const CategorySchema = new Schema({
	name: { type: String, required: true, unique: true },
	userId: { type: String, required: true, unique: true },
})

export default mongoose.model<ICategory>('Category', CategorySchema)
