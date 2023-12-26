import Square from "./Square";
import { useGridStore } from "../store/grid_store";

type Props = {
	answers: string[],
};

const Grid = ({ answers }: Props) => {
	const gridArr = useGridStore((state) => state.grid);
	return (
		<div className="row-start-2 row-span-3 col-span-3 grid grid-rows-3 grid-flow-col gap-1 aspect-square ">
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
