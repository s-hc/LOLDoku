import { Request, Response, NextFunction } from "express";
import {
	addNewChampionToDatabase,
	fetchChampionData,
	isTheChampionInTheDatabase,
	modifyTagsToTag1Tag2,
} from "../services/championService.js";

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

export const cacheChampions = async (_req:Request,res:Response,next:NextFunction) => {
	console.log("---In cacheChampions in championController.ts---");
	for (const champion of res.locals.champions) {
		//fresh pull from api
		modifyTagsToTag1Tag2(champion);
		//now it has 2 tags instead of 1 array
		const theChampionIsInTheDatabase = await isTheChampionInTheDatabase(champion.name)

		if(!theChampionIsInTheDatabase) {
			//champ is not in database
			await addNewChampionToDatabase(champion);
			//champ is in database but does the tags table look like?
		}
	}
	next();
}

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
