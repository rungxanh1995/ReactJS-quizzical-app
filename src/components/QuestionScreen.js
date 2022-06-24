import React from "react";
import ApiService from "../api/ApiService";
import { nanoid } from "nanoid";
import Quiz from "./Quiz";

function QuestionScreen() {
	
	const [allQuizzes, setAllQuizes] = React.useState([]);
	const [quiz, setQuiz] = React.useState({
		category: "",
		difficulty: "",
		question: "",
		correct_answer: "",
		incorrect_answers: []
	});
	
	React.useEffect(
		() => {
			new ApiService(/*url:*/ "https://opentdb.com/api.php?amount=5&type=multiple")
				.fetchData()
				.then(quizData => setAllQuizes(quizData.results));
		}, /*dependency array*/ []
	);
	
	const quizElements = allQuizzes.map(quiz => {
		return <Quiz
			key={nanoid()}
			question={quiz.question}
			correctAnswer={quiz.correct_answer}
			incorrectAnswers={quiz.incorrect_answers}
		/>
	});
	
	return (
		<div>
			<h1>Question screen</h1>
			{quizElements}
			{/*<pre>{JSON.stringify(allQuizzes, null, 4)}</pre>*/}
		</div>
		
	);
}

export default QuestionScreen;