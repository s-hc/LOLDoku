import { Request, Response, NextFunction } from "express";
import { fetchChampionData } from "../services/championService.js";

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
