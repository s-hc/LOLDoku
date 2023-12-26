import { Request, Response, NextFunction } from "express";
import {
	fetchChampionData,
	isTheChampionInTheDatabase,
} from "../services/championService.js";
import { db } from "../utils/db.server.js";
import { nextTick } from "process";
import { Champion } from "@prisma/client";

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

//Grabs the champion data

// data is literally in your res.locals.champions

/** Helper functions imported from championServices
 * isTheChampionInTheDatabase(<takes in champion name: string>): boolean
 */

const someFunctionThatSaysWhatsNotInTheDatabase = (data) => {
	//need to write a way to format the tags into true false values for all inputs
	/**
	 * might be better to go through and make the possibilities for now
	 * My main question is how take string[] and make bool{} in an easy way
	 * could default all to false
	 * then go through making a new entry for each new combo or
	 * if the combo exists add champ to existing champ array in new table
	 *
	 * yes doing that
	 */
	/*
        create a new array of champions that need to be put into the database
        const championsThatAreNotInTheDatabase = [];

        Iterate through the champions{
            check if the champion name is already in the database (probably an async function)

            if it's not in the database 2 things need to happen:
                1. We need to check what tags are on the champion to replace the array of strings with the correct Tag.id
                2. We need to add the champion to the input array 
            if(!isTheChampionInTheDatabase) {
                const currentChampionTags:<not sure how to type this could use help on that> = {};
                champion.tags.forEach(tag => {
                    currentChampionTags[tag] = true
                });
                
            }
            it's not
            create a table entry
            fill out {name, image, faction, resource}
        }
        */
};

export const addNewChampionsToDatabase = async (
	championsToBeAddedToDatabase: Champion[],
	next: NextFunction
) => {
	console.log(
		`<--Seeding ${championsToBeAddedToDatabase.length} champions into database.-->`
	);
	const champions = await db.champion.createMany({
		data: championsToBeAddedToDatabase,
	});
	console.dir(champions, { depth: null }); //Will show full depth of objects
	next();
};

// export const cacheChampions = async (
// 	_req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	console.log("---In cacheChampions in championController.ts---");

// 	// have data from res.locals.champions
// 	for (const champion of res.locals.champions) {
// 		const { faction, name, image, tags } = champion;

// 		// Add Champion to Database
// 		const newChampion = new Champions({ name, image, faction, tags });
// 		newChampion
// 			.save()
// 			.then((savedChampion) => {
// 				res.locals.champion = savedChampion;

// 				// Add Champion to Faction
// 				Factions.findOneAndUpdate(
// 					{ factionName: faction },
// 					{ $push: { champions: savedChampion._id } },
// 					{ new: true }
// 				)
// 					.then(() => {
// 						console.log("In findOneAndUpdate then block");
// 						for (const tag of tags) {
// 							Tags.findOneAndUpdate(
// 								{ tagName: tag },
// 								{ $push: { champions: savedChampion._id } },
// 								{ new: true }
// 							)
// 								.then(() => {
// 									console.log("In findOneAndUpdate then block for Tags");
// 									return next();
// 								})
// 								.catch((err) => {
// 									console.log(
// 										"Error in findOneAndUpdate of Tags for",
// 										tag,
// 										": ",
// 										err
// 									);
// 									return next({
// 										log: "Error in findOneAndUpdate of Tags for",
// 										status: 500,
// 										message: { err: "An error occurred in saving tag" },
// 									});
// 								});
// 						}
// 					})
// 					.catch((err) => {
// 						console.log(
// 							"Error in findOneAndUpdate of Faction for",
// 							faction,
// 							": ",
// 							err
// 						);
// 						return next({
// 							log: "Error in findOneAndUpdate of Faction for",
// 							status: 500,
// 							message: { err: "An error occurred in saving faction" },
// 						});
// 					});
// 			})
// 			.catch((err) => {
// 				console.log("Error in save of Champion: ", err);
// 				return next({
// 					log: "Error in save of Champion in championController.ts",
// 					status: 500,
// 					message: { err: "An error occurred in saving champion" },
// 				});
// 			});
// 	}
// };

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
