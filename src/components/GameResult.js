import Confetti from "react-confetti";

export function GameResult(/* Object */ props) {
	
	function generateCheers() {
		const didScoreMaxPoints = props.rightAnswerCount === props.allQuizzes.length;
		
		if (didScoreMaxPoints) {
			return `Nailed all ${props.allQuizzes.length} quizzes 💪 Way to go 🥳`;
		} else {
			return `You got ${props.rightAnswerCount}/${props.allQuizzes.length} correct answers 😎`
		}
	}
	
	return (
		<>
			<Confetti/>
			<p>
				{generateCheers()}
			</p>
			<button className="btn btn--quiz-screen-main" onClick={props.playAgain}>
				Play again
			</button>
		</>
	);
}
