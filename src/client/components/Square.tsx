import { Button } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/client/components/ui/dialog";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/client/components/ui/command";
import raw from "@/server/demoRaw.json";
import { useGuessesStore } from "../store/guesses_store";
import { CSSProperties, useState } from "react";

type Props = {
	champion: {
		name?: string,
		champNum?: number,
	},
	answer: string[],
	squareNum: number,
	makeGuess: (guess: string, num: number, ind: number) => void,
};

const Square = ({ champion, answer, squareNum, makeGuess }: Props) => {
	const decrease = useGuessesStore((state) => state.decrease);
	const champArr = raw;
	const haveGuesses = useGuessesStore((state) => state.guesses);
	let imageObj: {
		uri: any,
		x: any,
		width: any,
		y: any,
		height: any,
		title?: string,
		subtitle?: string,
		description?: string,
		encoding?: string,
		"featured-champions"?: any[],
	};
	let inlineStyle: CSSProperties;
	const champExists = champion.name != undefined;
	console.log(champExists, "does this champ exist");
	if (champExists) {
		imageObj = champArr[champion.champNum].image;
		inlineStyle = {
			backgroundImage: `url(${imageObj.uri})`,
			backgroundPosition: `${(100 * imageObj.x) / imageObj.width}% ${(100 * imageObj.y) / imageObj.height
				}%`,
			backgroundSize: "cover",
		};
	}

	const [open, setOpen] = useState(false);

	return champExists ? (
		<Button
			disabled={true}
			variant="outline"
			size={"lg"}
			className="items-end px-0 bg-cover size-full"
			style={inlineStyle}
		>
			<div className="w-full text-md bg-background size-6">
				{champion.name}
			</div>
		</Button>
	) : (
		// guessing dropdown menu if there is not an answer
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					disabled={haveGuesses <= 0}
					variant="outline"
					size={"lg"}
					className="size-full"
				></Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Make Your Guess</DialogTitle>
					<DialogDescription>{`you should guess ${answer[0]}`}</DialogDescription>
				</DialogHeader>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{champArr.map((ele, ind) => (
								<CommandItem
									key={`champNo${ind}`}
									className="size-full"
									onSelect={() => {
										// if the guess is correct, trigger makeGuess.
										// if the guess is incorrect, set the style of this obj to the angry red???
										makeGuess(ele.name, ind, squareNum);
										decrease();
										setOpen(false);
									}}
								>
									{ele.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
};

export default Square;
