import Grid from "../components/Grid";
import json from "../../server/demoData.json";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useBearStore } from "../store/guesses_store";

function HomePage() {
	const guesses = useBearStore((state) => state.guesses);

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
