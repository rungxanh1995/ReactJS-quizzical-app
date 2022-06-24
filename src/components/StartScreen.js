import React from "react";

function StartScreen(/*Object*/ props) {
	return (
		<div className={"start-screen"}>
			<h1>
				Quizzical
			</h1>
			<p>
				Are you a geography guru 🌏?<br/>Test it out yourself 😎
			</p>
			<button className={"btn btn--start-screen"} onClick={props.onClick}>
				Start quiz
			</button>
		</div>
	);
}

export default StartScreen;