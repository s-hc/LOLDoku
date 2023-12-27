import Square from "./Square";
import { useGridStore } from "../store/grid_store";

type Props = {
	answers: string[],
};

const Grid = ({ answers }: Props) => {
	const gridArr = useGridStore((state) => state.grid);
	return (
		<div className="px-0 row-start-2 row-span-3 col-span-3 grid grid-cols-subgrid grid-flow-row gap-1 ">
			{gridArr.map((ele, ind) => (
				<Square
					key={`square${ind}`}
					champion={ele.name}
					answer={answers[ind]}
					squareNum={ind}
				/>
			))}
		</div>
	);
};

export default Grid;
