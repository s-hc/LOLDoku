import Square from "./Square";

type Props = {
	answers: string[],
};

const Grid = ({ answers }: Props) => {
	return (
		<div className="grid grid-rows-3 grid-flow-col gap-1 w-1/2 aspect-square mx-auto">
			{answers.map((ele, ind) => (
				<Square key={ind} champion={ele} />
			))}
		</div>
	);
};

export default Grid;
