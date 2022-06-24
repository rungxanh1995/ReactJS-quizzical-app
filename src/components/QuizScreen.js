import React from "react";
import ApiService from "../api/ApiService";
import { nanoid } from "nanoid";
import Quiz from "./Quiz";
import ApiUrlConstants from "../api/ApiUrlConstants";

function QuizScreen(/*object*/ props) {
	
	const [quizRawData, setQuizRawData] = React.useState([])
	const [allQuizzes, setAllQuizzes] = React.useState([]);
	const [quiz, setQuiz] = React.useState({
		question: "",
		correct_answer: "",
		incorrect_answers: []
	});
	
	React.useEffect(
		() => {
			if (props.hasGameStarted) {
				fetchQuizDataFromOnlineSource();
			}
		}, /*dependency array*/ [props.hasGameStarted]
	);
	
	React.useEffect(
		() => {
			setAllQuizzes(/* with: */
				quizRawData.map(rawDataPiece => createQuizObject(/*from:*/ rawDataPiece))
			);
		}, /*dependency array*/ [quizRawData]
	);
	
	function fetchQuizDataFromOnlineSource() {
		const geographyQuizUrl = new ApiUrlConstants().getUrl(/*for:*/ "geography");
		new ApiService(/*url:*/ geographyQuizUrl)
			.fetchData()
			.then(quizData => setQuizRawData(/*with:*/ quizData.results));
	}
	
	function createQuizObject(/*object*/ dataItem) {
		return {
			id: nanoid(),
			question: dataItem.question,
			correctAnswer: dataItem.correct_answer,
			allAnswers: createAllQuizAnswers(/*from:*/ dataItem)
		}
	}
	
	function createAllQuizAnswers(/*object*/ dataItem) {
		// start with array of incorrect answers
		let answersArray = dataItem.incorrect_answers;
		
		// insert correct answer at random place
		const randomAnswerLocation = Math.floor(Math.random() * answersArray.length);
		answersArray.splice(
			/*at:*/ randomAnswerLocation,
			/*deleteCount:*/ 0,
			/*with:*/ dataItem.correct_answer
		);
		
		return answersArray.map(answer => ({
			id: nanoid(),
			text: answer,
			isSelected: false
		}))
	}
	const quizElements = allQuizzes.map(quiz => {
		return <Quiz
			key={quiz.id}
			question={quiz.question}
			allAnswers={quiz.allAnswers}
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