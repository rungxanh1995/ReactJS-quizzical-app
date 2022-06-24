import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import ApiUrlConstants from "../api/ApiUrlConstants";
import ApiService from "../api/ApiService";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import Quiz from './Quiz';


function QuizzicalGame() {
	const [isGameStarted, setIsGameStarted] = useState(false)
	const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false)
	const [quizRawData, setQuizRawData] = useState([])
	const [allQuizzes, setAllQuizzes] = useState([])
	const [rightAnswerCount, setRightAnswerCount] = useState(0)
	
	useEffect(() => {
		// Fetch data only if game has started
		if (isGameStarted) {
			fetchDataFromApiSource();
		}
	}, [isGameStarted])
	
	useEffect(() => {
		const rawQuizToObjects = quizRawData.map(eachItem => createQuizObject(/* from: */ eachItem));
		setAllQuizzes(/* to: */ rawQuizToObjects);
	}, [quizRawData])
	
	
	function fetchDataFromApiSource() {
		const url = new ApiUrlConstants().getUrl("geography");
		new ApiService(url)
			.fetchData()
			.then(data => setQuizRawData(/* to: */ data.results));
	}
	
	function createQuizObject(/* Object */ rawDataItem) {
		return {
			id: nanoid(),
			question: rawDataItem.question,
			correctAnswer: rawDataItem.correct_answer,
			answers: createAndMapAnswerObjects(/* from: */ rawDataItem),
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
		
		return answersArray.map(eachAnswer => ({
			id: nanoid(),
			text: eachAnswer,
			isSelected: false,
		}));
	}
	
	function selectAnswer(/* string */ quizId, /* string */ answerId) {
		const moddedQuizzesByUser = (prevQuizzes) =>
			prevQuizzes.map(eachQuiz =>
				eachQuiz.id !== quizId ?
					eachQuiz
					:
					{
						...eachQuiz,
						answers: eachQuiz.answers.map(eachAnswer =>
							eachAnswer.id !== answerId ?
								{ ...eachAnswer, isSelected: false }
								:
								{ ...eachAnswer, isSelected: true }
						),
					}
			);
		
		setAllQuizzes(/* to: */ moddedQuizzesByUser);
	}
	
	function checkAnswers() {
		let correctAnswerCount = 0;
		
		allQuizzes.forEach(eachQuiz => {
			const selectedAnswer = eachQuiz.answers.find(
				itsAnswer => itsAnswer.isSelected
			);
			
			if (selectedAnswer && selectedAnswer.text === eachQuiz.correctAnswer) {
				correctAnswerCount++;
			}
		});
		
		setRightAnswerCount(/* to: */ correctAnswerCount);
		setHasCheckedAnswers(/* to: */ true);
	}
	
	function playAgain() {
		setRightAnswerCount(/* to: */ 0);
		setHasCheckedAnswers(/* to: */ false);
		setIsGameStarted(/* to: */ false);
	}
	
	function startQuiz() {
		setIsGameStarted(/* to: */ true);
	}
	
	const quizElements = allQuizzes.map(eachQuiz => (
		<Quiz
			key={eachQuiz.id}
			data={eachQuiz}
			hasCheckedAnswers={hasCheckedAnswers}
			selectAnswer={(event) => selectAnswer(eachQuiz.id, event.target.id)}
		/>
	))
	
	function showQuizzes() {
		return (
			<QuizScreen
				quizComponentList={quizElements}
				hasCheckedAnswers={hasCheckedAnswers}
				rightAnswerCount={rightAnswerCount}
				allQuizzes={allQuizzes}
				playAgain={playAgain}
				checkAnswers={checkAnswers}
			/>
		)
	}
	
	return (
		<div>
			{!isGameStarted ? <StartScreen startQuiz={startQuiz} /> : showQuizzes()}
		</div>
	)
}

export default QuizzicalGame;
