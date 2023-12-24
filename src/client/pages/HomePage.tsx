import Grid from "../components/Grid";
import json from "../../server/demoData.json";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

function HomePage() {
	console.log(json.data);
	return (
		<MaxWidthWrapper>
			<h1>Home Page</h1>
			<MaxWidthWrapper>
				<Grid answers={json.data} />
			</MaxWidthWrapper>
			<div>Points:1000</div>
		</MaxWidthWrapper>
	);
}

export default HomePage;
