import mongoose from "mongoose";

const championSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: {
			description: String,
			encoding: String,
			"featured-champions": Array,
			height: Number,
			subtitle: String,
			title: String,
			uri: String,
			width: Number,
			x: Number,
			y: Number,
		},
		required: true,
	},
	faction: {
		type: String,
		required: true,
	},
	tags: {
		type: Array,
		required: true,
	},
});

const Champions = mongoose.model("Champions", championSchema);

export { Champions };
