import React from "react";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";

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
				<QuizScreen hasGameStarted={isGameStarted} />
			}
		</div>
	);
}

export default QuizzicalGame;