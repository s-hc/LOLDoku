import Square from "./Square";
import { useGridStore } from "../store/grid_store";

type Props = {
	answers: string[][],
};

const Grid = ({ answers }: Props) => {
	const gridArr = useGridStore((state) => state.grid);
	const makeGuess = useGridStore((state) => state.makeGuess);
	return (
		<div className="grid grid-cols-subgrid grid-flow-row row-start-2 row-span-3 col-span-3 gap-1 px-0">
			{gridArr.map((ele, ind) => (
				<Square
					key={`square${ind}`}
					champion={ele}
					answer={answers[ind]}
					squareNum={ind}
					makeGuess={makeGuess}
				/>
			))}
		</div>
	);
};

export default Grid;
