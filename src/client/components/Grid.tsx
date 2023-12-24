import Square from "./Square";

/**
 * MaxWidthWrapper Component
 * Purpose:
 * - Component is designed to wrap child elements and provide them with consistent styling
 * - Ensures content is centered and constrained in width, which is useful for responsiveness
 * - Applies maximum width limit and horizontal padding, adapting values to screen size
 *
 * How to Use:
 * - Wrap any element or components with 'MaxWidthWrapper' component.
 * - The 'className' prop can be used to pass additional custom styling if needed
 * - Component auto-centers content horizontally and applies appropriate padding
 *
 * Example:
 * <MaxWidthWrapper className="custom-class">
 *   <div>Content</div>
 * </MaxWidthWrapper>
 *
 * Styling Details:
 * - 'mx-auto' centers content horizontally
 * - 'w-full' ensures content takes up full width of parent container
 * - 'max-w-screen-xl' sets maximum width of content to match extra-large screen size breakpoint
 * - 'px-2.5 md:px-20' sets horizontal padding to 2.5px, or 20px on medium and larger screens
 */

type Props = {
	answers: string[],
};

const Grid = ({ answers }: Props) => {
	return (
		<div className="grid grid-rows-3 grid-flow-col gap-4">
			{answers.map((ele, ind) => (
				<Square key={ind} champion={ele} />
			))}
		</div>
	);
};

export default Grid;
