import HomePage from "./HomePage";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Navbar />
			<HomePage />
		</ThemeProvider>
	);
}

export default App;
