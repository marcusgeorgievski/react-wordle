import React from "react";
import "./nav.css";
import { GiCow } from "react-icons/gi";

// Icons
import { MdHelpCenter } from "react-icons/md";

export default function Nav({ toggleHint }) {
	return (
		<div className="nav">
			<div className="this"></div>
			<div className="title fcc">
				<GiCow className="cow" />
				Wordle
			</div>
			{/* <div className="hint fcc" onClick={() => toggleHint()}>
				<MdHelpCenter />
			</div> */}
		</div>
	);
}
