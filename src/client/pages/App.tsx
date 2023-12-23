import HomePage from "./HomePage";
import Navbar from "../components/Navbar";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

function App() {
	return (
		<div>
			<Navbar />
			<MaxWidthWrapper>
				<HomePage />
			</MaxWidthWrapper>
		</div>
	);
}

export default App;
