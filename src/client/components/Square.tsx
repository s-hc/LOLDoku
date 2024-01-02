import { Button } from "@/client/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
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

type Props = {
	champion: string | undefined,
	champNum: number | undefined,
	answer: string[],
	squareNum: number,
	makeGuess: (guess: string, num: number, ind: number) => void,
};

const Square = ({
	champion,
	answer,
	champNum,
	squareNum,
	makeGuess,
}: Props) => {
	const decrease = useGuessesStore((state) => state.decrease);
	const champArr = raw;
	const haveGuesses = useGuessesStore((state) => state.guesses);
	const selectedChamp =
		champNum != undefined ? champArr[champNum].image : undefined;
	const inlineStyle =
		champNum != undefined
			? {
					backgroundImage: `url(${selectedChamp.uri})`,
					backgroundPosition: `${
						(100 * selectedChamp.x) / selectedChamp.width
					}% ${(100 * selectedChamp.y) / selectedChamp.height}%`,
					backgroundSize: "cover",
			  }
			: {};
	return (
		// champion != undefined ? //code here : //code here
		// <div className="border-solid border-2">{champion ?? ""}</div>
		// if champion exists, <Button>champion</
		// if not, dialog+trigger

		<Dialog>
			<DialogTrigger asChild>
				<Button
					disabled={champion != undefined || haveGuesses <= 0}
					variant="outline"
					size={"lg"}
					className="size-full bg-cover"
					// style={champion!=undefined ? inlineStyle:{}}
					style={inlineStyle}
					// className="w-[calc(952px/5)] h-[calc(952px/5)] "
				>
					{champion ?? ""}
				</Button>
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
								<CommandItem key={`champNo${ind}`}>
									<DialogClose
										className="size-full"
										onClick={() => {
											makeGuess(ele.name, ind, squareNum);
											decrease();
										}}
									>
										{ele.name}
									</DialogClose>
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
