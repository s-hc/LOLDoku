import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	authId: { type: String, unique: true },
	name: { type: String, required: true },
	picture: String,
	gamesPlayed: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
