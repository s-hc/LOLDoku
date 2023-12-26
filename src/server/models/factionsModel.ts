import mongoose, { Schema } from "mongoose";

const factionsSchema = new mongoose.Schema({
	factionName: {
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

const Factions = mongoose.model("Factions", factionsSchema);

export { Factions };
