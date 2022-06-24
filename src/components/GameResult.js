import Confetti from "react-confetti";

export function GameResult(/* Object */ props) {
	return (
		<>
			<Confetti/>
			<p>
				You scored {props.rightAnswerCount + "/" + props.allQuizzes.length} correct
				answers
			</p>
			<button className="btn btn--quiz-screen-main" onClick={props.playAgain}>
				Play again
			</button>
		</>
	);
}
