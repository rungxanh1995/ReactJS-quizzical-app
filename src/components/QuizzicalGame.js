import React from "react";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";

function QuizzicalGame() {
	const [isGameStarted, setIsGameStarted] = React.useState(false);
	
	function didClickStartQuizButton() {
		setIsGameStarted(true);
	}
	
	return (
		<div>
			{
				isGameStarted === false ?
				<StartScreen onClick={didClickStartQuizButton} /> :
				<QuestionScreen />
			}
		</div>
	);
}

export default QuizzicalGame;