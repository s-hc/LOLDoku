import { Icons } from "@/client/assets/icons";
import { Button } from "@/client/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AuthenticationPage() {
	const navigate = useNavigate();

	const handleGoogleAuth = () => {
		window.location.href = "http://localhost:3000/auth/google";
	};

	// const handleGithubAuth = () => {
	// 	navigate("/auth/github");
	// };

	// const handleAppleAuth = () => {
	// 	navigate("/auth/apple");
	// };

	return (
		<>
			<div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
				<span className="relative inset-0 flex items-center w-full border-t" />
				<Button variant="default" onClick={handleGoogleAuth}>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button variant="destructive" onClick={() => navigate("/")}>
					<Icons.apple className="mr-2 h-4 w-4" />
					Apple ... Coming Soon
				</Button>
				<Button variant="destructive" onClick={() => navigate("/")}>
					<Icons.gitHub className="mr-2 h-4 w-4" />
					GitHub ... Coming Soon
				</Button>
			</div>
		</>
	);
}
