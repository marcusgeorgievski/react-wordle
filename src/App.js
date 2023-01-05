import { useState, useEffect } from "react";

// Data
import Data from "./data/db";

// Components
import Nav from "./components/Nav/Nav";
import Wordle from "./components/Wordle/Wordle";
import Modal from "./components/Modal/Modal";

function App() {
	// Data state
	const [data, setData] = useState(Data); // all data
	// const [solutionWords, setSolutionWords] = useState(Data.solutions);
	const [solution, setSolution] = useState(null); // solution object {id, word, hint}

	// Modal state
	const [showWelcome, setShowWelcome] = useState(true);
	const [showHint, setShowHint] = useState(false);
	// const [solutionNumber, setSolutionNumber] = useState(0);

	// Sets new random word as solution
	const newSolution = () => {
		const max = data.solutions.length;
		const randomNum = Math.floor(Math.random() * max);
		setSolution(data.solutions[randomNum]);
	};

	// Sets next index as new solution
	// const newSolution2 = async () => {
	// 	const max = data.solutions.length;

	// 	if (solutionNumber == max) {
	// 		setSolutionNumber(0);
	// 		shuffle(solutionWords);
	// 	}
	// 	setSolution(data.solutions[randomNum]);
	// };

	// Create ranndom ordered array of solution words
	// const shuffle = () => {
	// 	const array = data.solutions; // temp array

	// 	for (let i = array.length - 1; i > 0; i--) {
	// 		let j = Math.floor(Math.random() * (i + 1));
	// 		[array[i], array[j]] = [array[j], array[i]];
	// 	}

	// 	setData(array);
	// 	console.log(array);
	// };

	// Toggle hint modal
	const toggleHint = () => {
		setShowHint(!showHint);
	};
	// Toggle welcome modal
	const toggleWelcome = () => {
		setShowWelcome(!showWelcome);
	};

	useEffect(() => {
		// shuffle();
		newSolution();
		// setData([...Data.solutions, ...Data.solutions2]); // For when variable length words is functional
	}, []);

	return (
		<div className="App">
			<Nav toggleHint={toggleHint} />

			{/* {solution && <p>solution: {solution.solution}</p>} */}
			{solution && (
				<Wordle
					solution={solution}
					newSolution={newSolution}
					// hint={solution.hint}
				/>
			)}

			{/* MODALS */}
			{showWelcome && <Modal toggleModal={toggleWelcome} />}
			{showHint && (
				<Modal toggleModal={toggleHint} hint={solution.hint} />
			)}
		</div>
	);
}

export default App;
