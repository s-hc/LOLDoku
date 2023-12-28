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
// import champs from "../../server/demoChampList.json";
import raw from "../../server/demoRaw.json";
import { useGuessesStore } from "../store/guesses_store";
import { useGridStore } from "../store/grid_store";

type Props = {
	champion: string | undefined,
	answer: string[],
	squareNum: number,
};

const Square = ({ champion, answer, squareNum }: Props) => {
	const decrease = useGuessesStore((state) => state.decrease);
	const makeGuess = useGridStore((state) => state.makeGuess);
	const champArr = raw;
	return (
		// <div className="border-solid border-2">{champion ?? ""}</div>

		<Dialog>
			<DialogTrigger asChild>
				<Button
					disabled={champion != undefined}
					variant="outline"
					size={"lg"}
					className="size-full"
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
											makeGuess(ele.name, squareNum);
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
