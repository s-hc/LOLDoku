import Grid from "../components/Grid";
import json from "../../server/demoData.json";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useGuessesStore } from "../store/guesses_store";
import { Button } from "../components/ui/button";

function HomePage() {
	const guesses = useGuessesStore((state) => state.guesses);
	const giveUp = useGuessesStore((state) => state.giveup);
	const cols = json.columns;
	const rows = json.rows;

	const rowClass = ["row-start-2", "row-start-3", "row-start-4"];
	const colClass = ["col-start-2", "col-start-3", "col-start-4"];

	return (
		<MaxWidthWrapper>
			<div className="grid grid-cols-4 grid-rows-5 px-5 grid-flow-row mx-auto aspect-square">
				{rows.map((ele, ind) => (
					<Button
						disabled
						variant={"secondary"}
						className={` w-1/2 mx-auto my-auto ${rowClass[ind]}`}
						key={`row${ind}`}
					>
						{ele}
					</Button>
				))}
				{cols.map((ele, ind) => (
					<Button
						disabled
						variant={"secondary"}
						className={` w-1/2  mx-auto my-auto ${colClass[ind]}`}
						key={`col${ind}`}
					>
						{ele}
					</Button>
				))}

				<Grid answers={json.data} />
				<div className="my-auto h-full gap-2 flex px-4 justify-center flex-col row-start-5 col-start-2 col-end-5">
					<Button disabled variant="secondary">
						{`Guesses: ${guesses}`}
					</Button>
					<Button variant="destructive" onClick={() => giveUp()}>
						Give up
					</Button>
				</div>
			</div>
		</MaxWidthWrapper>
	);
}

export default HomePage;
