/**
 * Service to handle fetching of champion data.
 * - Includes functions for fetching champion data from external APIs
 * - Processes and formats the fetched data
 */

import axios from "axios";

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
