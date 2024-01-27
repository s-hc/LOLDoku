import { Request, Response, NextFunction } from "express";
import { fetchChampionData } from "../services/championService.js";

import {
	addNewChampionToDatabase,
	isTheChampionInTheDatabase,
	fetchColsandRows,
	validateGrid,
	uploadGrid,
} from "../services/dbService.js";
import {
	emptyFactions,
	emptyTags,
	insertFactions,
	insertTags,
} from "../services/headerService.js";

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

export const cacheChampions = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("---In cacheChampions in championController.ts---");

	console.log("---Building missing champ array---");
	const champCheck = [];
	for (const champion of res.locals.champions) {
		champCheck.push(isTheChampionInTheDatabase(champion.name));
	}
	const missingChamps = [];
	for (const [ind, ele] of (await Promise.all(champCheck)).entries()) {
		if (ele == false) {
			missingChamps.push(addNewChampionToDatabase(res.locals.champions[ind]));
		}
	}
	console.log(`pushing ${missingChamps.length} champions to db`);
	await Promise.all(missingChamps);
	next();
};

export const buildTags = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	// make all potential rows, all potential cols (excluding last 3)
	// make a random set to validate
	// cols are factions rows are roles
	const [colObj, rowObj] = await fetchColsandRows().catch((error) =>
		next(error)
	);
	const allCols = colObj.map((ele) => ele.headline);
	const allRows = rowObj.map((ele) => ele.headline);
	const fetchThree = (arr: any[]) => {
		const returnArr = [];
		if (arr.length < 3) return returnArr;
		const randSet = new Set();
		while (returnArr.length < 3) {
			const i = Math.floor(Math.random() * arr.length);
			if (randSet.has(i)) {
				continue;
			} else {
				randSet.add(i);
				returnArr.push(arr[i]);
			}
		}
		return returnArr;
	};
	// fetch 3 random unique columns and rows
	let potentialRows = fetchThree(allRows);
	let potentialCols = fetchThree(allCols);
	// attempt to validate the answer
	for (let i = 0; i < 20; i++) {
		console.log("Awaiting validate Grid");
		// so if the promise fulfills then we just return the answer, if it fails then we go again
		let mistake;
		const ans = await validateGrid(potentialCols, potentialRows).catch(
			(err) => {
				mistake = err;
			}
		);
		if (mistake) {
			if (mistake == "no answers") {
				potentialRows = fetchThree(allRows);
				potentialCols = fetchThree(allCols);
				continue;
			} else {
				return next(mistake.reason);
			}
		}
		res.locals.grid = {
			data: ans,
			columns: potentialCols,
			rows: potentialRows,
		};

		return next();
	}
	return next({
		message: "failed random generation 20 times",
		log: "failed generation 20 times",
	});
};

export const uploadTags = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	const { columns, rows } = res.locals.grid;
	const uploadNum = await uploadGrid(columns, rows).catch((err) => next(err));
	res.locals.num = uploadNum["id"] ?? -1;
	console.log("reslocals num is", res.locals.num);
	return next();
};

export const makeHeaders = async (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	const empty = await emptyFactions();
	console.log(`adding in ${empty.length} factions`);
	await insertFactions(empty.map((ele) => ele.faction));
	const tags = await emptyTags();
	await insertTags(tags.map((ele) => ele.tag));
	console.log("returning next");
	return next();
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
