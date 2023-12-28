import Navbar from "@/client/components/Navbar";
import * as utils from "@/client/lib/utils";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

describe("Navbar Component", () => {
  
  // Restore the original window.location object after each test to prevent side effects <particularly in logout reload>
  let originalLocation: Location;

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
  })
});


/**
 * Notes: fireEvent.click() vs userEvent.click()
 * 
 * fireEvent
 * - lower-level API provided by RTL that triggers specified event on DOM element
 * - limitation: it may not always simulate user's interaction with UI accurately
 *  - e.g. when using fireEvent.click, only triggers click event and does not emulate complete sequence of events a user would trigger when clicking on an element
 * 
 * userEvent
 * - higher-level API provided by @testing-library/user-event that simulates user's interaction with UI
 * - more accurate simulation of user's interaction with UI
 * - generally preferred for simulating more complex interaction snad for tests that emulate user's interaction with UI more closely
 * 
 * userEvent more preferrable oeverall, but fireEvent is still more useful in some cases:
 *  - Testing low level events
 *  - Simple, allows triggering event without a lot of additional behaviors
 *  - Performant
 *  - Fallback for when userEvent doesn't work
 * 
 */