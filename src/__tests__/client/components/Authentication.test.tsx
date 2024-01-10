import Authentication from "@/client/components/Authentication";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/client/config", () => ({
	getBackendUrl: () => "http://localhost:3000/auth/google",
}));

// jest.mock("@/client/config", () => ({
// 	getUserUrl: () => "http://localhost:3000/auth/get-user",
// 	getLogoutUrl: () => "http://localhost:3000/auth/logout",
// }));

jest.mock("@/client/lib/importMetaFunctions/getUserUrl", () => ({
	getUserUrl: () => "http://localhost:3000/auth/get-user",
}));

describe("<Authentication />", () => {
	it("should render the Authentication component", () => {
		render(<Authentication />);
		fireEvent.click(screen.getByText("Login"));

		expect(screen.getByText("Sign In")).toBeInTheDocument();
		expect(
			screen.getByText("Sign in for access to more features!")
		).toBeInTheDocument();
		expect(screen.getByText("Google")).toBeInTheDocument();
		expect(screen.getByText("Apple ... Coming Soon")).toBeInTheDocument();
		expect(screen.getByText("GitHub ... Coming Soon")).toBeInTheDocument();
	});

	it("navigates to Google authentication on button click", () => {
		// Mock the window.location.href assignment
		delete window.location;
		window.location = { href: "" } as any;

		render(<Authentication />);
		fireEvent.click(screen.getByText("Login"));
		fireEvent.click(screen.getByText("Google"));

		expect(window.location.href).toBe("http://localhost:3000/auth/google");
	});

	// UPDATE THIS TEST ONCE APPLE AND GITHUB ARE IMPLEMENTED
	it("logs to the console when Apple and GitHub auth button is clicked", () => {
		console.log = jest.fn();
		render(<Authentication />);
		fireEvent.click(screen.getByText("Login"));
		fireEvent.click(screen.getByText("Apple ... Coming Soon"));
		fireEvent.click(screen.getByText("GitHub ... Coming Soon"));
		expect(console.log).toHaveBeenCalledWith("Apple...coming soon");
		expect(console.log).toHaveBeenCalledWith("GitHub...coming soon");
	});
});
