// /**
//  * Service to handle sending the data to the front-end as useable data with minimal processing
//  * - Includes functions for fetching champions from the database
//  * - Processes and formats the fetched data
//  */

// import { db } from "../utils/db.server"

// /**
//  * This function generates a random board for the player to play on.
//  * @param {string}field1 the first
//  * @returns {string[][]}
//  */
// export const generateCombinationsForFieldOneAndFieldTwo = async (field1: string, field2: string): Promise<string[][]> => {

//     /**
//      * Helper Function that randomizes the return given an array of data
//      * @param {any[]}arr: array array to generate a random set from
//      * @param {number}count: number Length of the array that should be returned
//      */
//     const generateRandomPermutationWithLengthCount = <T>(arr: T[], count: number): T[] => {
//         const shuffled = [...arr];
//         for (let i = arr.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//         }
//         return shuffled.slice(0, count);
//     }

//     // this lets us add any other fields for the board later
//     // need to write an update function for this when needed
//     const optionsObject = {
//         tags:[
//         "Assassin",
//         "Fighter",
//         "Mage",
//         "Marksman",
//         "Support",
//         "Tank"
//         ],
//         factions: [
//         "bandle-city",
//         "bilgewater",
//         "freljord",
//         "ionia",
//         "ixtal",
//         "mount-targon",
//         "noxus",
//         "piltover",
//         "runeterra",
//         "shadow-isles",
//         "shurima",
//         "void",
//         "zaun"
//     ]
// }

//     const randomizedFieldOne = generateRandomPermutationWithLengthCount<string>( optionsObject[field1], 3);
//     const randomizedFieldTwo = generateRandomPermutationWithLengthCount<string>( optionsObject[field2], 3);

//     return [randomizedFieldOne, randomizedFieldTwo];
// }

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// //This is to specify the shape of the champion data that results from the database query
// //used in findManyChampionsWhereTagAndFactionOverLap and generatePossibleAnswersArray currently (update this later and move to model file)
// type champion = {
//     // to be filled in by @JeremyC3 @leesamuel423
// }
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// /**
//  * Function to query for a specific {faction, tag} combination in the champion table
//  * @param {string} tag
//  * @param {string} faction
//  * @returns {Champions[]} where every champion is a valid answer for that field
//  */

// export const findManyChampionsWhereTagAndFactionOverLap = async (tag: string, faction: string): Promise<champion[]> => {
// 	return await db.champion.findMany({
// 		where: {
//             AND: [
//                 {
//                     OR: [
//                         {
//                             tag1: {
//                                 tag
//                             },
//                         },
//                         {
//                             tag2: {
//                                 tag
//                             }
//                         }
//                     ],
//                 },
//                 {
//                     faction,
//                 }
//             ]
// 		},
// 		select: {
// 			name: true,
// 			image: true,

// 		}
// 	})
// }
// // (param1, specific1, param2, specific2) => ie: (tags, tagName, faction, factionName) => ie: (faction, factionName, resource, resourceName)

// /**
//  * Function that, when given the tags and factions headers in the board will return a list of valid response objects for every square
//  * @param {Array<Array<string>>} board - [field1[length3], field2[length3]]
//  * @returns {Promise<Array<Array<Array<champion>>>>} should return a list of valid champions for every square on the board
//  */
// export const generatePossibleAnswersArray = async (board:Array<Array<string>>):Promise<Array<Array<Array<champion>>>> => {
//     const field1 = board[0];
//     const field2 = board[1];
//     const result = [];

//     for(let f1 of field1) {
//         const row = [];
//         for(let f2 of field2) {
//             const champions = await findManyChampionsWhereTagAndFactionOverLap(f1, f2)
//                 .then()
//                 .catch()
//             row.push(champions);
//         }
//         result.push(row);
//     }
//     return result;
// };

// //@JeremyC3 @leesamuel423 everything below this line should go in it's own file,
// //again I don't know what else you're chaning or what files need to add to this so I'm going to leave it here
// /**
//  * This is the controller file for game instances
//  */
// import { Request, Response } from "express";
// export const generateImmaculateGridWithTheseTwoFields = async (__req: Request,__res: Response) => {
//     //I'm adding fields 1 and 2 incase we choose to add other factors into the game. They would come from the request object
//     const field1: string = "tags";
//     const field2: string = "factions";

//     console.log(`<---Generating game board for ${field1} and ${field2}--->`);
//     const fieldsForBoard = await generateCombinationsForFieldOneAndFieldTwo(field1, field2);
//     const gameBoardPossibleAnswers = await generatePossibleAnswersArray(fieldsForBoard);

//     __res.status(200).json(gameBoardPossibleAnswers)
// }
