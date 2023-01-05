import React from "react";
import "./modal.css";

const Modal = ({ toggleModal, word, hint, isCorrect, outcome }) => {
	// Welcome and hint
	if (!outcome) {
		return (
			<div className="modal">
				<div>
					<h1>{hint ? "Hint!" : "Hi"}</h1>

					{/* WELCOME */}
					{!hint && (
						<div className="msg">
							<p className="fcc">Welcome</p>
							<p>
								This is my clone of the hit game{" "}
								<span className="game">Worlde</span>.
							</p>
							<p>The only two words at the moment are "hello" and "words", will add more.</p>
							<div className="signature">
								<p>Have fun,</p>
								<p>Marcus</p>
							</div>
						</div>
					)}

					{/* HINT */}
					{hint && <p>{hint}</p>}

					<button onClick={() => toggleModal()}>
						{hint ? "Thanks" : "Alright"}
					</button>
				</div>
			</div>
		);
	}

	// Win or loss
	return (
		<div className="modal outcome">
			<div>
				<h1>{isCorrect ? "You win!" : "You lose."}</h1>

				<p>
					{isCorrect ? "" : "The word was: "}
					<span className="word">{word}</span>
				</p>
				{/* <p>"{hint}"</p> */}

				<button onClick={() => toggleModal()}>New word</button>
			</div>
		</div>
	);
};

export default Modal;
