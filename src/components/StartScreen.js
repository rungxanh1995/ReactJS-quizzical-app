import React from "react";

function StartScreen(/*Object*/ props) {
	return (
		<div>
			<h1>
				Start screen
			</h1>
			<button onClick={props.onClick}>
				Start quiz
			</button>
		</div>
	);
}

export default StartScreen;