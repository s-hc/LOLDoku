import MaxWidthWrapper from "@/client/components/MaxWidthWrapper";
import { render, screen } from "@testing-library/react";

describe("<MaxWidthWrapper />", () => {
	it("renders its children", () => {
		render(
			<MaxWidthWrapper>
				<div data-testid="child">Test Child</div>
			</MaxWidthWrapper>
		);

		const child = screen.getByTestId("child");
		expect(child).toBeInTheDocument();
		expect(child).toHaveTextContent("Test Child");
	});

	it("applies base classes", () => {
		render(
			<MaxWidthWrapper>
				<div data-testid="child" />
			</MaxWidthWrapper>
		);

		const wrapper = screen.getByTestId("child").parentElement;
		expect(wrapper).toHaveClass(
			"mx-auto w-full max-w-screen-xl px-2.5 md:px-20"
		);
	});

	it("combines base classes with additional classes", () => {
		const additionalClass = "additional-class";
		render(
			<MaxWidthWrapper className={additionalClass}>
				<div data-testid="child" />
			</MaxWidthWrapper>
		);

		const wrapper = screen.getByTestId("child").parentElement;
		expect(wrapper).toHaveClass(
			"mx-auto w-full max-w-screen-xl px-2.5 md:px-20 additional-class"
		);
	});
});
