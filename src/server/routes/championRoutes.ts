import express, { Request, Response } from "express";
import {
	getChampions,
	cacheChampions,
} from "../controllers/championController.js";

const championRoutes = express.Router();

/**
 * GET endpoint for scraping champion data.
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 */
championRoutes.get(
	"/scrape",
	getChampions,
	cacheChampions,
	(_req: Request, res: Response) => {
		return res.status(200).json(res.locals.champions);
	}
);

export default championRoutes;
