import { Request, Response, NextFunction } from "express";
import { fetchChampionData } from "../services/championService.js";
// import { Champions } from "../models/championModel.js";
// import { Factions } from "../models/factionsModel.js";
// import { Tags } from "../models/tagsModel.js";

/**
 * Controller to handle the fetching of champion data.
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
export const getChampions = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("---In getChampions in championController.ts---");
	try {
		const data = await fetchChampionData();
		res.locals.champions = data;
		return next();
	} catch (err) {
		return next({
			log: "Error in getChampions controller in championController.ts",
			status: 500,
			message: { err: "An error occurred in fetching champions" },
		});
	}
};

export const cacheChampions = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("---In cacheChampions in championController.ts---");

	// have data from res.locals.champions
	for (const champion of res.locals.champions) {
		const { faction, name, image, tags } = champion;

		// Add Champion to Database
		const newChampion = new Champions({ name, image, faction, tags });
		newChampion
			.save()
			.then((savedChampion) => {
				res.locals.champion = savedChampion;

				// Add Champion to Faction
				Factions.findOneAndUpdate(
					{ factionName: faction },
					{ $push: { champions: savedChampion._id } },
					{ new: true }
				)
					.then(() => {
						console.log("In findOneAndUpdate then block");
						for (const tag of tags) {
							Tags.findOneAndUpdate(
								{ tagName: tag },
								{ $push: { champions: savedChampion._id } },
								{ new: true }
							)
								.then(() => {
									console.log("In findOneAndUpdate then block for Tags");
									return next();
								})
								.catch((err) => {
									console.log(
										"Error in findOneAndUpdate of Tags for",
										tag,
										": ",
										err
									);
									return next({
										log: "Error in findOneAndUpdate of Tags for",
										status: 500,
										message: { err: "An error occurred in saving tag" },
									});
								});
						}
					})
					.catch((err) => {
						console.log(
							"Error in findOneAndUpdate of Faction for",
							faction,
							": ",
							err
						);
						return next({
							log: "Error in findOneAndUpdate of Faction for",
							status: 500,
							message: { err: "An error occurred in saving faction" },
						});
					});
			})
			.catch((err) => {
				console.log("Error in save of Champion: ", err);
				return next({
					log: "Error in save of Champion in championController.ts",
					status: 500,
					message: { err: "An error occurred in saving champion" },
				});
			});
	}
};

/**
 * Mock Data from getChampions
 * https://docs.google.com/document/d/1n1Hp7O9TYVDGzB1jpX7qgnLTOq_MMXieusS22x99eY4/edit?usp=sharing
 *
 * !TODO: Current issue is we need to 
 *	  (A) Update Champion or Create new Instance (is there a mongo thingy for that)
		There is a way to do this with prisma and realistically we can have a script run every 3 months or on command which will query everything for us
 *   !(B) Update Factions and Tags same idea...(if it doesn't already exist, we need to make it, but if it exists we add to it)
 *   ! Obviously this can be done through multiple queries (check if it exists and .then do extra stuff, but it would be nice to get it all done in one go)
 */
