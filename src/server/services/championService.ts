/**
 * Service to handle fetching of champion data.
 * - Includes functions for fetching champion data from external APIs
 * - Processes and formats the fetched data
 */

import axios from "axios";
import { db } from "../utils/db.server.js";
import { Champion } from "@prisma/client";

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
					image: champ.image,
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
 * converts tags to tag1 and tag2
 * This should only run if a champion still has the "tags" property instead of tag1, tag2.
 * @param champion 
 * @returns modified champion object
 */
export const modifyTagsToTag1Tag2 = (champion:any)=>{
	console.log(`<--Modifying ${champion.name} tags-->`)
	champion.tag1 = champion.tags[0];
	champion.tags[1] ? champion.tag2 = champion.tags[1] : champion.tag2 = "null";
	delete champion.tags;
	return champion;
}

/**
 * This function only adds new champions to the database
 * @param championToBeAddedToDatabase This is the new champion
 * @param next Express next function
 */
export const addNewChampionToDatabase = async (
	championToBeAddedToDatabase: Champion,
) => {
	await db.champion.create({
		data: championToBeAddedToDatabase,
	})
	.then(()=>{
		console.log(`<--${championToBeAddedToDatabase.name}successfully added into database.-->`)
	})
	.catch((error:any)=>{
		console.log(`<--Error adding ${championToBeAddedToDatabase.name} to database!-->`)
		console.error(error)
	})
};
