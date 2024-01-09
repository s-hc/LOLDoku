/**
 * Service to handle fetching of champion data.
 * - Includes functions for fetching champion data from external APIs
 * - Processes and formats the fetched data
 */

import axios from "axios";
import { db } from "../utils/db.server.js";

interface ChampRes {
	name: string;
	releaseDate: string;
	champDescription: string;
	imageUri: string;
	xOffset: number;
	yOffset: number;
	faction: string;
	tags: string[];
	resource: string;
}

/**
 * Dictionary for champion name exceptions.
 */
const championExceptions: Record<string, string> = {
	"Bel’Veth": "Belveth",
	"Dr. Mundo": "DrMundo",
	"Kog'Maw": "KogMaw",
	"K’Sante": "KSante",
	LeBlanc: "Leblanc",
	"Nunu & Willump": "Nunu",
	"Rek'Sai": "RekSai",
	"Renata Glasc": "Renata",
	Wukong: "MonkeyKing",
};

/**
 * Formats champion names.
 * @param {string} name - Original champion name.
 * @returns {string} Formatted name.
 */
const formatName = (name: string): string => {
	let newString = "";
	let lowerNext = false;
	if (championExceptions[name]) {
		return championExceptions[name];
	}
	for (const char of name) {
		if (char === "'") {
			lowerNext = true;
		} else if (lowerNext) {
			newString += char.toLowerCase();
			lowerNext = false;
		} else if (char !== " ") {
			newString += char;
		}
	}
	return newString;
};

/**
 * Asynchronous function to fetch champion data from various sources
 * Combines and formats data from different sources.
 * @returns {Promise<any>} - Promise containing champion data
 */
export const fetchChampionData = async (): Promise<any> => {
	const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
	const mainUrl =
		"https://universe-meeps.leagueoflegends.com/v1/en_us/champion-browse/index.json";

	try {
		const versionResponse = await axios.get(versionsUrl);
		// Use the latest data version
		const ddragonUrl = `http://ddragon.leagueoflegends.com/cdn/${versionResponse.data[0]}/data/en_US/champion.json`;

		const mainResponse = await axios.get(mainUrl);
		const ddragonResponse = await axios.get(ddragonUrl);

		const champions = mainResponse.data.champions;
		const ddChampions = ddragonResponse.data.data;

		const finalData = champions.map((champ: any) => {
			const sectionTitle = formatName(champ["section-title"]);
			const championData = ddChampions[sectionTitle];
			if (championData) {
				return {
					name: champ.name,
					releaseDate: champ.releaseDate,
					champDescription: championData.blurb,
					imageUri: champ.image.uri,
					xOffset: (100 * champ.image.x) / champ.image.width,
					yOffset: (100 * champ.image.y) / champ.image.height,
					faction:
						champ["associated-faction-slug"] === "unaffiliated"
							? "runeterra"
							: champ["associated-faction-slug"],
					tags: championData.tags,
					resource: championData.partype,
				};
			}
			return {
				name: champ.name,
				error: "Failed to fetch champion specific data",
			};
		});

		return finalData.filter((data: any) => !data.error);
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

/**
 * Helper function to decide to skip entries or not
 * @param name
 * @returns Promise<boolean>
 */
export const isTheChampionInTheDatabase = async (
	name: string
): Promise<boolean> => {
	const result = await db.champion.findFirst({
		where: {
			name,
		},
	});
	return !!result;
};

/**
 * This function adds new champions to the champ table, then adds their tags to the tags table.
 * @param championToBeAddedToDatabase This is the new champion
 * @param next Express next function
 */
export const addNewChampionToDatabase = async (
	championToBeAddedToDatabase: ChampRes
) => {
	const { name, imageUri, faction, resource, xOffset, yOffset, tags } =
		championToBeAddedToDatabase;
	let id: number;
	await db.champion
		.create({
			data: {
				name,
				uri: imageUri,
				faction,
				resource,
				xOffset,
				yOffset,
			},
			select: {
				id: true,
			},
		})
		.then((res) => {
			id = res.id;
			console.log(
				`<--${championToBeAddedToDatabase.name} successfully added into database.-->`
			);
		})
		.catch((error: any) => {
			console.log(
				`<--Error adding ${championToBeAddedToDatabase.name} to database!-->`
			);
			console.error(error);
		});

	await db.role
		.createMany({
			data: tags.map((ele) => ({ tag: ele, champ: id })),
		})
		.then(() => {
			console.log(
				`<--tags for ${championToBeAddedToDatabase.name} successfully added into database.-->`
			);
		})
		.catch((error: any) => {
			console.log(
				`<--Error adding ${championToBeAddedToDatabase.name} tags to database!-->`
			);
			console.error(error);
		});
};

/**
 * This function returns distinct rows and columns.
 * @param void no specifics needed for parameters.
 * @returns Promise<any> returns an array of promises for cols & rows
 */
export const fetchColsandRows = async (): Promise<any> => {
	const rowPromise = db.champion.findMany({
		distinct: ["faction"],
		select: {
			faction: true,
		},
	});
	const colPromise = db.role.findMany({
		distinct: ["tag"],
		select: {
			tag: true,
		},
	});
	return Promise.all([colPromise, rowPromise]);
};

/**
 *
 * @param cols
 * @param rows
 * @returns Promise<any> fulfill: returns array of array of champs.
 * Rejects on either SQL error or empty array return
 */
export const validateGrid = async (cols: any[], rows: any[]): Promise<any> => {
	const promiseArr = [];
	const findChamp = async (faction: string, tag: string) => {
		return db.champion
			.findMany({
				select: {
					name: true,
				},
				where: {
					faction,
					tags: {
						some: {
							tag,
						},
					},
				},
			})
			.then((arr) => {
				if (arr.length == 0) {
					return Promise.reject("no answers");
				} else return arr.map((ele) => ele.name);
			})
			.catch((err) => Promise.reject(err));
	};
	for (const tag of cols) {
		for (const faction of rows) {
			promiseArr.push(findChamp(faction, tag));
		}
	}
	return Promise.all(promiseArr);
};
