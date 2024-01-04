export default interface incomingChampionData {
	"name": string
	"image": {
		"title": string,
		"subtitle": string,
		"description": string,
		"uri": string,
		"encoding": string,
		"width": number,
		"height": number,
		"x": number,
		"y": number,
		"featured-champions": string[]
	},
	"faction": string,
	"tags": string[],
	"resource": string
}
