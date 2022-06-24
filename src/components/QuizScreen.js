import React from "react";
import ApiService from "../api/ApiService";
import { nanoid } from "nanoid";
import Quiz from "./Quiz";
import ApiUrlConstants from "../api/ApiUrlConstants";

function QuizScreen(/*object*/ props) {
	
	const [quizRawData, setQuizRawData] = React.useState([])
	const [allQuizzes, setAllQuizes] = React.useState([]);
	const [quiz, setQuiz] = React.useState({
		category: "",
		difficulty: "",
		question: "",
		correct_answer: "",
		incorrect_answers: []
	});
	
	function fetchQuizDataFromOnlineSource() {
		const geographyQuizUrl = new ApiUrlConstants().getUrl(/*for:*/ "geography");
		new ApiService(/*url:*/ geographyQuizUrl)
			.fetchData()
			.then(quizData => setQuizRawData(quizData.results));
	}
	
	React.useEffect(
		() => {
			if (props.hasGameStarted) {
				fetchQuizDataFromOnlineSource();
			}
		}, /*dependency array*/ [props.hasGameStarted]
	);
	
	const quizElements = quizRawData.map(quiz => {
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

export default QuizScreen;