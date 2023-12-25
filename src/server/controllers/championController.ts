import { Request, Response, NextFunction } from "express";
import { fetchChampionData } from "../services/championService.js";

export const getChampions = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
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
