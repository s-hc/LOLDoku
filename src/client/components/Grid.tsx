import Square from "./Square";

type Props = {
	answers: string[],
};

const Grid = ({ answers }: Props) => {
	return (
		<div className="grid grid-rows-3 grid-flow-col gap-4 w-5/6">
			{answers.map((ele, ind) => (
				<Square key={ind} champion={ele} />
			))}
		</div>
	);
};

export default Grid;
