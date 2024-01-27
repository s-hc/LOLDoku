import { db } from "../utils/db.server.js";

//dbService contains all files used in the database.

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
	const colPromise = db.header.findMany({
		distinct: ["headline"],
		select: {
			headline: true,
		},
		where: {
			roleOrFaction: 2,
		},
	});
	const rowPromise = db.header.findMany({
		distinct: ["headline"],
		select: {
			headline: true,
		},
		where: {
			roleOrFaction: 1,
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
		const col = await db.header.findFirst({
			select: {
				id: true,
			},
			where: {
				headline: faction,
			},
		});
		const row = await db.header.findFirst({
			select: {
				id: true,
			},
			where: {
				headline: tag,
			},
		});
		return db.champion
			.findMany({
				select: {
					name: true,
				},
				where: {
					AND: [
						{
							headers: {
								some: {
									header: row.id,
								},
							},
						},
						{
							headers: {
								some: {
									header: col.id,
								},
							},
						},
					],
				},
			})
			.then((arr) => {
				if (arr.length == 0) {
					return Promise.reject("no answers");
				} else return arr.map((ele) => ele.name);
			})
			.catch((err) => Promise.reject(err));
	};
	for (const faction of cols) {
		for (const tag of rows) {
			promiseArr.push(findChamp(faction, tag));
		}
	}
	return Promise.all(promiseArr);
};

export const uploadGrid = async (cols: string[], rows: string[]) => {
	// set the first day, should never change realistically.
	const dayOne = new Date("Jan 9 2024");
	// get the latest day and use it when we up date?
	// take rows and turn them into row1-3
	// take cols and turn them into col1-3
	// take all answers
	return db.schedule.create({
		data: {
			row1: rows[0],
			row2: rows[1],
			row3: rows[2],
			col1: cols[0],
			col2: cols[1],
			col3: cols[2],
			date: dayOne,
		},
		select: {
			id: true,
		},
	});
};
