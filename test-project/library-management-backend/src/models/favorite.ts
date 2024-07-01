import mongoose, { Schema, Document } from 'mongoose'

interface IFavorite extends Document {
	userId: string
	bookId: string
}

const FavoriteSchema = new Schema({
	userId: { type: String, required: true },
	bookId: { type: String, required: true },
})

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema)
