import {
	render,
	screen,
	waitFor,
	fireEvent,
	act,
} from "@testing-library/react";
import Navbar from "@/client/components/Navbar";
import * as utils from "@/client/lib/utils";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// Mock the utility functions
jest.mock("@/client/lib/utils", () => ({
	...jest.requireActual("@/client/lib/utils"),
	fetchUserData: jest.fn(),
	logOut: jest.fn(),
}));

// Cast the mocked functions to jest.Mock
const mockedFetchUserData = utils.fetchUserData as jest.Mock;
const mockedLogOut = utils.logOut as jest.Mock;

// Helper function to render the component within a Router context
const renderNavbar = (user = null) => {
	mockedFetchUserData.mockResolvedValue(user);
	render(
		<MemoryRouter>
			<Navbar />
		</MemoryRouter>
	);
};

jest.mock("@/client/config", () => ({
	getBackendUrl: () => "http://localhost:3000",
}));

jest.mock("@/client/lib/importMetaFunctions/getUserUrl", () => ({
	getUserUrl: () => "http://localhost:3000/auth/get-user",
}));
describe("Navbar Component", () => {
	// Restore the original window.location object after each test to prevent side effects <particularly in logout reload>
	let originalLocation: Location;

	beforeAll(() => {
		globalThis.import = {
			meta: {
				env: {
					VITE_BACKEND_URL: "http://localhost:3000",
				},
			},
		};
	});

	beforeEach(() => {
		originalLocation = window.location;
		delete window.location;
		window.location = { ...originalLocation, reload: jest.fn() };
	});

	afterEach(() => {
		window.location = originalLocation;
	});

	it("should render correctly when user is not logged in", () => {
		renderNavbar();
		expect(screen.getByText("Rules")).toBeInTheDocument();
		expect(screen.getByText("Login")).toBeInTheDocument();
	});

	it("component should render properly when user logs in and user should be able to log out", async () => {
		renderNavbar({ name: "Test User" });

		await waitFor(() => {
			expect(screen.getByText("Rules")).toBeInTheDocument();
			expect(screen.getByText("Test User")).toBeInTheDocument();
		});

		userEvent.click(screen.getByText("Test User"));

		await waitFor(() => {
			expect(screen.getByText("Log Out")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Log Out"));

		expect(mockedLogOut).toHaveBeenCalledTimes(1);
	});

	it("should show mode options when user clicks on the mode button", async () => {
		renderNavbar();

		await act(async () => {
			userEvent.click(screen.getByText("Toggle theme"));
		});

		await waitFor(async () => {
			expect(screen.getByText("Light")).toBeInTheDocument();
			expect(screen.getByText("Dark")).toBeInTheDocument();
			expect(screen.getByText("System")).toBeInTheDocument();
		});
	});

	it("should render Rules modal when user clicks on the Rules button", async () => {
		renderNavbar();
		await act(async () => {
			userEvent.click(screen.getByText("Rules"));
		});
		await waitFor(async () => {
			expect(screen.getByText("Rules")).toBeInTheDocument();
		});
	});
});
