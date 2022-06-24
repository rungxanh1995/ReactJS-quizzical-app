import {GameResult} from "./GameResult";
import {CheckAnswers} from "./CheckAnswers";

function QuizScreen(props) {
	return (
		<>
			<div className="questions">
				
				{props.quizComponentList}
				
				<div className="checkQuestions--lbl">
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
