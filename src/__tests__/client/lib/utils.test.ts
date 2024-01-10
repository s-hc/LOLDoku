import { cn, fetchUserData, logOut } from "@/client/lib/utils"; // replace with your actual file path
import fetchMock from "jest-fetch-mock";

// Mock Backend Functions
jest.mock("@/client/lib/importMetaFunctions/getUserUrl", () => ({
	getUserUrl: () => "http://localhost:3000/auth/get-user",
}));

jest.mock("@/client/lib/importMetaFunctions/getLogoutUrl", () => ({
	getLogoutUrl: () => "http://localhost:3000/auth/logout",
}));

describe("cn function", () => {
	it("should correctly merge class names", () => {
		const result = cn("class1", "class2", "class3");
		expect(result).toBe("class1 class2 class3");
	});
});

fetchMock.enableMocks();

beforeEach(() => {
	fetchMock.resetMocks();
});

describe("fetchUserData function", () => {
	it("should return user data on success", async () => {
		const mockUserData = { id: 1, name: "John Doe" };
		fetchMock.mockResponseOnce(JSON.stringify(mockUserData));

		const data = await fetchUserData();
		expect(data).toEqual(mockUserData);
	});

	it("should return null on failure", async () => {
		fetchMock.mockReject(new Error("Failed to fetch"));

		const data = await fetchUserData();
		expect(data).toBeNull();
	});
});

describe("logOut function", () => {
	it("should return response object on successful logout", async () => {
		const mockResponse = { message: "Logged out successfully" };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		const response = await logOut();
		expect(response).toEqual(mockResponse);
	});

	it("should return null on failure", async () => {
		fetchMock.mockReject(new Error("Failed to log out"));

		const response = await logOut();
		expect(response).toBeNull();
	});
});
