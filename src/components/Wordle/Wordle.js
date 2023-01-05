import React, { useEffect, useState } from "react";
import "./wordle.css";

// Hooks
import UseWordle from "../../hooks/useWordle";

// Components
import Grid from "../Grid/Grid";
import Keyboard from "../Keyboard/Keyboard";
import Modal from "../Modal/Modal";

export default function Wordle({ solution, newSolution, hint }) {
	// useWordle hook
	const {
		currentGuess,
		turn,
		guesses,
		usedKeys,
		isCorrect,
		setIsCorrect,
		handleKeyup,
		resetState,
	} = UseWordle(solution);

	// Modal state
	const [showModal, setShowModal] = useState(false);

	const newGame = () => {
		resetState();
		newSolution();
		setShowModal(false);
	};

	useEffect(() => {
		window.addEventListener("keyup", handleKeyup);

		if (isCorrect) {
			// setTimeout(() => setShowModal(true), 2000);
			console.log("win");
			setShowModal(true);
			window.removeEventListener("keyup", handleKeyup);
		}
		if (turn > 5) {
			// setTimeout(() => setShowModal(true), 2000);
			console.log("loss");
			setShowModal(true);
			window.removeEventListener("keyup", handleKeyup);
		}

		return () => window.removeEventListener("keyup", handleKeyup);
	}, [handleKeyup, isCorrect, turn]);

	return (
		<div className="wordle">
			{/* <p>Current guess: {currentGuess}</p> */}
			<Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
			<Keyboard usedKeys={usedKeys} handleKeyup={handleKeyup} />

			{showModal && (
				<Modal
					toggleModal={newGame}
					word={solution}
					isCorrect={isCorrect}
					outcome={true}
					hint={hint}
				/>
			)}
		</div>
	);
}
