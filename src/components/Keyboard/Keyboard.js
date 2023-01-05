import React, { useState, useEffect } from "react";
import Data from "../../data/db";
import "./keyboard2.css";

import { BsBackspace } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

const Keyboard = ({ usedKeys, handleKeyup }) => {
	const [letters, setLetters] = useState(Data.keyboardLetters);
	const [row1, setRow1] = useState(Data.keyboardLetters[0]);
	const [row2, setRow2] = useState(Data.keyboardLetters[1]);
	const [row3, setRow3] = useState(Data.keyboardLetters[2]);

	return (
		<div className="keyboard ">
			<div className="keyrow row1">
				{letters &&
					row1.map((l) => {
						const color = usedKeys[l.key];
						const classes = ` ${color}`;
						return (
							<div
								key={l.key}
								className={classes}
								onClick={() => {
									handleKeyup(l);
								}}
							>
								{l.key}
							</div>
						);
					})}
			</div>

			<div className="keyrow row2">
				{letters &&
					row2.map((l) => {
						const color = usedKeys[l.key];
						const classes = `${color}`;
						return (
							<div
								key={l.key}
								className={classes}
								onClick={() => {
									handleKeyup(l);
								}}
							>
								{l.key}
							</div>
						);
					})}
			</div>

			<div className="keyrow row3">
				{letters &&
					row3.map((l) => {
						const color = usedKeys[l.key];
						const classes = ` ${color}`;
						const specialClasses = ` specialKey ${color}`; // For special keys

						if (l.key === "Backspace") {
							return (
								<div
									key={l.key}
									className={specialClasses}
									onClick={() => {
										handleKeyup(l);
									}}
								>
									<BsBackspace />
								</div>
							);
						} else if (l.key === "Enter") {
							return (
								<div
									key={l.key}
									className={specialClasses}
									onClick={() => {
										handleKeyup(l);
									}}
								>
									<AiOutlineCheck
										style={{ color: "#6fe66f" }}
									/>
								</div>
							);
						}
						return (
							<div
								key={l.key}
								className={classes}
								onClick={() => {
									handleKeyup(l);
								}}
							>
								{l.key}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Keyboard;
