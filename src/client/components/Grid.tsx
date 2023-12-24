import Square from "./Square";

type Props = {
	answers: string[],
};

const Grid = ({ answers }: Props) => {
	return (
		<div className="row-start-2 row-span-3 col-span-3 grid grid-rows-3 grid-flow-col gap-1 aspect-square ">
			{answers.map((ele, ind) => (
				<Square key={`square${ind}`} champion={ele} />
			))}
		</div>
	);
};

export default Grid;
