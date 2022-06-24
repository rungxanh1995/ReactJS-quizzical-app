import {GameResult} from "./GameResult";
import {CheckAnswers} from "./CheckAnswers";

function QuizScreen(/* Object */ props) {
	return (
		<>
			<div className="quiz-screen">
				
				{props.quizComponentList}
				
				<div className="quiz-screen--check-answers">
					{props.hasCheckedAnswers ? (
						<GameResult
							rightAnswerCount={props.rightAnswerCount}
							allQuizzes={props.allQuizzes}
							playAgain={props.playAgain}
						/>
					) : (
						<CheckAnswers
							checkAnswers={props.checkAnswers}
						/>
					)}
				</div>
			
			</div>
		</>
	);
}

export default QuizScreen;
