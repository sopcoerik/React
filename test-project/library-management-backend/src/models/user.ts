import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
	username: string
	email: string
	password: string
}

const UserSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true, minLength: 3 },
	email: {
		type: String,
		required: true,
		unique: true,
		minLength: 7,
		lowercase: true,
	},
	password: { type: String, required: true, minLength: 5 },
})

export default mongoose.model<IUser>('User', UserSchema)
