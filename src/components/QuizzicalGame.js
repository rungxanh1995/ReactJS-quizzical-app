import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Confetti from "react-confetti";
import Quiz from './Quiz';
import StartScreen from "./StartScreen";

function QuizzicalGame() {
	const [hasStarted, setHasStarted] = useState(false)
	const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false)
	const [quizRawData, setQuizRawData] = useState([])
	const [allQuizzes, setAllQuizzes] = useState([])
	const [rightAnswerCount, setRightAnswerCount] = useState(0)
	
	useEffect(() => {
		// Fetch data only if game has started
		if (hasStarted) {
			fetch(
				"https://opentdb.com/api.php?amount=5&category=22&type=multiple"
			)
				.then((res) => res.json())
				.then((data) => setQuizRawData(data.results))
		}
	}, [hasStarted])
	
	useEffect(() => {
		setAllQuizzes(quizRawData.map((item) => generateQuestionObject(item)))
	}, [quizRawData])
	
	function generateQuestionObject(dataItem) {
		return {
			id: nanoid(),
			question: dataItem.question,
			correctAnswer: dataItem.correct_answer,
			answers: generateAnswers(dataItem),
		}
	}
	
	function generateAnswers(dataItem) {
		let answersArray = dataItem.incorrect_answers
		
		// Insert correct answer randomly
		const randomIndex = Math.floor(Math.random() * 3)
		answersArray.splice(randomIndex, 0, dataItem.correct_answer)
		
		return answersArray.map((answer) => ({
			id: nanoid(),
			text: answer,
			isSelected: false,
		}))
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
	
	function displayQuestions() {
		return (
			<>
				<div className="questions">
					{questionElements}
					<div className="checkQuestions--lbl">
						{hasCheckedAnswers ? (
							<>
								<Confetti />
								<p>
									You scored {rightAnswerCount + '/' + allQuizzes.length} correct
									answers
								</p>
								<button className="btn btn--quiz-screen-main" onClick={playAgain}>
									Play again
								</button>
							</>
						) : (
							<button className="btn btn--quiz-screen-main" onClick={checkAnswers}>
								Check answers
							</button>
						)}
					</div>
				</div>
			</>
		)
	}
	
	return (
		<div className="App">
			{!hasStarted ? <StartScreen startQuiz={startQuiz} /> : displayQuestions()}
		</div>
	)
}

export default QuizzicalGame;