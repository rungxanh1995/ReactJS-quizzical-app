import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Quiz from './Quiz';
import StartScreen from "./StartScreen";
import ApiUrlConstants from "../api/ApiUrlConstants";
import ApiService from "../api/ApiService";
import QuizScreen from "./QuizScreen";


function QuizzicalGame() {
	const [hasStarted, setHasStarted] = useState(false)
	const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false)
	const [quizRawData, setQuizRawData] = useState([])
	const [allQuizzes, setAllQuizzes] = useState([])
	const [rightAnswerCount, setRightAnswerCount] = useState(0)
	
	useEffect(() => {
		// Fetch data only if game has started
		if (hasStarted) {
			fetchDataFromApiSource();
		}
	}, [hasStarted])
	
	useEffect(() => {
		setAllQuizzes(quizRawData.map((item) => createQuizObject(item)))
	}, [quizRawData])
	
	
	function fetchDataFromApiSource() {
		const url = new ApiUrlConstants().getUrl("geography");
		new ApiService(url).fetchData().then(data => setQuizRawData(data.results));
	}
	
	function createQuizObject(/* Object */ rawDataItem) {
		return {
			id: nanoid(),
			question: rawDataItem.question,
			correctAnswer: rawDataItem.correct_answer,
			answers: createAndMapAnswerObjects(/* for: */ rawDataItem),
		}
	}
	
	function createAndMapAnswerObjects(/* Object */ rawDataItem) {
		let answersArray = rawDataItem.incorrect_answers;
		
		// Insert correct answer randomly
		const randomIndex = Math.floor(Math.random() * answersArray.length);
		answersArray.splice(
			/* at: */ randomIndex,
			/* deleteCount: */ 0,
			/* with: */ rawDataItem.correct_answer
		);
		
		return answersArray.map(answer => ({
			id: nanoid(),
			text: answer,
			isSelected: false,
		}));
	}
	
	function selectAnswer(questionId, answerId) {
		setAllQuizzes((oldQuestions) =>
			oldQuestions.map((question) =>
				question.id !== questionId
					? question
					: {
						...question,
						answers: question.answers.map((answer) =>
							answer.id !== answerId
								? { ...answer, isSelected: false }
								: { ...answer, isSelected: true }
						),
					}
			)
		)
	}
	
	function checkAnswers() {
		let correctAnswerCount = 0
		allQuizzes.forEach((question) => {
			const selectedAnswer = question.answers.find(
				(answer) => answer.isSelected
			)
			if (selectedAnswer) {
				if (selectedAnswer.text === question.correctAnswer) {
					correctAnswerCount++
				}
			}
		})
		setRightAnswerCount(correctAnswerCount)
		setHasCheckedAnswers(true)
	}
	
	function playAgain() {
		setRightAnswerCount(0)
		setHasCheckedAnswers(false)
		setHasStarted(false)
	}
	
	function startQuiz() {
		setHasStarted(true)
	}
	
	const questionElements = allQuizzes.map((question) => (
		<Quiz
			key={question.id}
			data={question}
			hasCheckedAnswers={hasCheckedAnswers}
			selectAnswer={(e) => selectAnswer(question.id, e.target.id)}
		/>
	))
	
	function showQuizzes() {
		return (
			<QuizScreen
				quizComponentList={questionElements}
				hasCheckedAnswers={hasCheckedAnswers}
				rightAnswerCount={rightAnswerCount}
				allQuizzes={allQuizzes}
				playAgain={playAgain}
				checkAnswers={checkAnswers}
			/>
		)
	}
	
	return (
		<div className="App">
			{!hasStarted ? <StartScreen startQuiz={startQuiz} /> : showQuizzes()}
		</div>
	)
}

export default QuizzicalGame;