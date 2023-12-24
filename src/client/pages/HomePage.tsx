import Grid from "../components/Grid";
import json from "../../server/demoData.json";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useGuessesStore } from "../store/guesses_store";

function HomePage() {
	const guesses = useGuessesStore((state) => state.guesses);

	return (
		<div className="homePage">
			<h1>Home Page</h1>
			<MaxWidthWrapper>
				<Grid answers={json.data} />
			</MaxWidthWrapper>
			<div>{`Guesses: ${guesses}`}</div>
		</div>
	);
}

export default HomePage;
