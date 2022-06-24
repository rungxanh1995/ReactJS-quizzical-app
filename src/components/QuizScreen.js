import Confetti from "react-confetti";

function QuizScreen(props) {
	return <>
		<div className="questions">
			
			{props.quizComponentList}
			
			<div className="checkQuestions--lbl">
				{props.hasCheckedAnswers ? (
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
				) : (
					<button className="btn btn--quiz-screen-main" onClick={props.checkAnswers}>
						Check answers
					</button>
				)}
			</div>
			
		</div>
	</>;
}

export default QuizScreen;
