import { db } from "../utils/db.server.js";
import { Prisma } from "@prisma/client";

// step 1: generate tag info
// step 2: generate faction info
// step 3: generate new tags after scraping

//returns the list of all Factions that are not located in the list
export const emptyFactions = async (): Promise<
	{
		id: number,
		faction: string,
	}[]
> => {
	const filledFactions = await db.header.findMany({
		select: {
			headline: true,
		},
		where: {
			roleOrFaction: 2,
		},
	});
	const factionArr = filledFactions.map((ele) => ele.headline);
	const result = await db.champion.findMany({
		select: {
			faction: true,
			id: true,
		},
		where: {
			faction: {
				notIn: factionArr,
			},
		},
		distinct: ["faction"],
	});
	return result;
};

//inserts all the empty factions, then all the valid champs into the validChamp pool.
export const insertFactions = async (missFaction: string[]) => {
	const properNames = (uglyStr: string) => {
		const words = uglyStr.split("-");
		for (const i in words) {
			const word = words[i];
			words[i] = word[0].toUpperCase() + word.slice(1);
		}
		return words.join(" ");
	};
	// const champArr: Prisma.HeaderUncheckedCreateInput[] = missFaction.map(
	// 	(ele) => ({
	// 		desc: `Champion is located in the ${properNames(ele)} region`,
	// 		headline: properNames(ele),
	// 		roleOrFaction: 2,
	// 	})
	// );

	// db.header.createMany({
	// 	data: champArr,
	// });
	// for each faction header missing, first get all champs that correspond to the faction as an arr
	for (const fac of missFaction) {
		const champs = await db.champion.findMany({
			select: {
				id: true,
			},
			where: {
				faction: fac,
			},
		});
		const headerID = await db.header.create({
			data: {
				desc: `Champion is located in the ${properNames(fac)} faction`,
				headline: fac,
				roleOrFaction: 2,
			},
			select: {
				id: true,
			},
		});
		const validArr: Prisma.ValidChampUncheckedCreateInput[] = champs.map(
			(ele) => ({
				header: headerID.id,
				answer: ele.id,
			})
		);

		const addedFacts = await db.validChamp.createMany({
			data: validArr,
		});
		console.log(
			`added ${addedFacts.count} characters in for header ${headerID.id}`
		);
	}
	// then create the header info, returning the id
	// then create the ValidChamp entries based on the headerID and champID
	// get the
	// get
	console.log("done");
	return true;
};

export const emptyTags = async () => {
	// get all the headers that are roles
	const filledTags = await db.header.findMany({
		select: {
			headline: true,
		},
		where: {
			roleOrFaction: 1,
		},
	});
	// find all missing roles
	const tagArr = filledTags.map((ele) => ele.headline);

	const tags = await db.role.findMany({
		select: {
			id: true,
			tag: true,
		},
		where: {
			tag: {
				notIn: tagArr,
			},
		},
		distinct: ["tag"],
	});
	console.log("tags done");
	return tags;
};

export const insertTags = async (missTags: string[]) => {
	for (const tag of missTags) {
		console.log(`making array for ${tag}`);
		const taggedChamps = await db.role.findMany({
			select: {
				champ: true,
			},
			where: {
				tag: tag,
			},
		});
		console.log("making header");
		// for each tag find its corresponding champs
		const newHeader = await db.header.create({
			data: {
				desc: `champion that is tagged as a ${tag} by Riot Games`,
				headline: tag,
				roleOrFaction: 1,
			},
			select: {
				id: true,
			},
		});
		console.log("made header now adding entries");
		// pass all of these results into a final arr
		const newEntries: Prisma.ValidChampUncheckedCreateInput[] =
			taggedChamps.map((ele) => ({
				header: newHeader.id,
				answer: ele.champ,
			}));
		console.log("map made");
		// console.log(newEntries);
		const madeCt = await db.validChamp.createMany({ data: newEntries });
		console.log(`added in ${madeCt.count} headers for tag ${tag}`);
	}
	console.log("finished tag loop");
	return true;
};
