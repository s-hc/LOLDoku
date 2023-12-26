import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	profilePicture: {
		type: Blob,
		required: false,
	},
});

const User = mongoose.model("User", userSchema);

export { User };
