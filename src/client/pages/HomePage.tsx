import Grid from "../components/Grid";
import json from "../../server/demoData.json";

function HomePage() {
	console.log(json.data);
	return (
		<div className="homePage">
			<h1>Home Page</h1>
			<Grid answers={json.data} />
			<div>Points:1000</div>
		</div>
	);
}

export default HomePage;
