import React, { useState } from "react";

const UseWordle = (solution) => {
	// State
	const [currentGuess, setCurrentGuess] = useState(""); // current guesses user is inputting: string
	const [turn, setTurn] = useState(0); // turn number, 5 or 6 max: integer
	const [guesses, setGuesses] = useState([...Array(6)]); // object array of each guesses characters {key, color}: Array[object]
	const [history, setHistory] = useState([]); // array of previous guesses: array[string]
	const [usedKeys, setUsedKeys] = useState({}); // object with keys {keys: keys used throughout current game, color: their corresponding color}: object{key, color}
	const [isCorrect, setIsCorrect] = useState(false); // is the submitted currentGuess correct: boolean

	// Handle every keyup event
	// Add new guess when 'enter' is clicked
	// states: currentGuess
	const handleKeyup = ({ key }) => {
		// Submitting a guess
		if (key === "Enter") {
			// check if max turns reached
			if (turn > 5) {
				console.log("Out of guesses");
				return;
			}

			// check if word was already guessed
			if (history.includes(currentGuess)) {
				console.log("you already tried that word.");
				return;
			}

			// check if word is desired length
			if (currentGuess.length !== 5) {
				console.log("word is less than 5 chars");
				return;
			}

			// if all good, format currentGuess
			const formatted = formatGuess();
			addNewGuess(formatted);
		}

		// Delete character
		if (key === "Backspace") {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
			return;
		}

		// Add character to currentGuess
		// regex check that valid char is clicked
		if (/^[a-zA-Z]$/.test(key)) {
			// Add key if currentGuess max length not reached
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + key;
				});
			}
		}
	};

	// Format a new guess
	// Create
	const formatGuess = () => {
		// Array of letters from solution and current guess
		let solutionLetters = [...solution]; // format: {'a', 'b', ...}
		let currentGuessLetters = [...currentGuess]; // format: {'a', 'b', ...}

		// Initialize formatted guess to default value grey
		let formattedGuess = currentGuessLetters.map((l) => {
			return { key: l, color: "grey" }; // default color to grey - THIS WILL BE guesses STATE
		});

		// Set green letters in formattedGuess
		formattedGuess.forEach((l, i) => {
			if (solutionLetters[i] === l.key) {
				formattedGuess[i].color = "green";
				solutionLetters[i] = null;
			}
		});

		// Set yellow letters in formattedGuess
		formattedGuess.forEach((l, i) => {
			if (solutionLetters.includes(l.key) && l.color !== "green") {
				formattedGuess[i].color = "yellow";
				solutionLetters[solutionLetters.indexOf(l.key)] = null;
			}
		});

		return formattedGuess; // format: [{key: 'a', color: 'green}, {...}]
	};

	// Successfully add new guess and update states
	const addNewGuess = (formattedGuess) => {
		// check if current guess is correct
		if (currentGuess === solution) {
			setIsCorrect(true);
		}

		// Add current formatted guess obj to guesses
		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses];
			newGuesses[turn] = formattedGuess;

			return newGuesses;
		});

		// Add current guess string to history
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		});

		// Increase turn count by 1
		setTurn((prevTurn) => {
			return (prevTurn += 1);
		});

		// Add keys from current guess to usedKeys
		setUsedKeys((prevUsedKeys) => {
			let newUsedKeys = { ...prevUsedKeys };

			// Loop thorugh formatted guess
			formattedGuess.forEach((l) => {
				const currentColor = newUsedKeys[l.key];

				// NOTE: review what this does in depth at some point
				if (l.color === "green") {
					newUsedKeys[l.key] = "green";
					return;
				}
				if (l.color === "yellow" && currentColor !== "green") {
					newUsedKeys[l.key] = "yellow";
					return;
				}
				if (
					l.color === "grey" &&
					currentColor !== "green" &&
					currentColor !== "yellow"
				) {
					newUsedKeys[l.key] = "grey";
					return;
				}
			});
			return newUsedKeys;
		});

		//
		setCurrentGuess("");
	};

	// Reset game
	const resetState = () => {
		setCurrentGuess("");
		setTurn(0);
		setGuesses([...Array(6)]);
		setHistory([]);
		setUsedKeys({});
		setIsCorrect(false);
	};

	return {
		currentGuess,
		turn,
		guesses,
		usedKeys,
		isCorrect,
		setIsCorrect,
		handleKeyup,
		resetState,
	};
};

export default UseWordle;
