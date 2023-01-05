import React from "react";
import "./row2.css";

const Row = ({ guess, currentGuess }) => {
	// Display previous guesses
	if (guess) {
		return (
			<div className="row past">
				{guess.map((l, i) => (
					<div key={i} className={l.color}>
						{l.key}
					</div>
				))}
			</div>
		);
	}

	// Display current guess row
	if (currentGuess) {
		let letters = currentGuess.split("");

		return (
			<div className="row current">
				{letters.map((letter, i) => {
					return (
						<div key={i} className="row filled">
							{letter}
						</div>
					);
				})}
				{[...Array(5 - letters.length)].map((_, i) => (
					<div key={i}></div>
				))}
			</div>
		);
	}

	// Display default blank squares
	return (
		<div className="row null">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Row;
