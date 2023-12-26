import mongoose, { Schema } from "mongoose";

const tagsSchema = new Schema({
	tagName: {
		type: String,
		required: true,
	},
	champions: {
		champ_id: [
			{
				type: Schema.Types.ObjectId,
				ref: "Champions",
			},
		],
	},
});

const Tags = mongoose.model("Tags", tagsSchema);

export { Tags };
