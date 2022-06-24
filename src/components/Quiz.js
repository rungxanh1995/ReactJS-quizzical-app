import React from "react";

function Quiz(/*object*/ props) {
	
	function decideClassNameFor(/* string */ anAnswer) {
		const hasSelectedAnswers = anAnswer.isSelected;
		const isAnswerCorrect = props.hasCheckedAnswers && (anAnswer.text === props.data.correctAnswer);
		const isAnswerIncorrect = props.hasCheckedAnswers && anAnswer.isSelected;
		
		let name = 'quiz--answer-btn';
		
		if (hasSelectedAnswers) {
			name += ' quiz--answer-selected';
		}
		
		if (isAnswerCorrect) {
			name += ' quiz--answer-correct';
		}
		
		if (isAnswerIncorrect) {
			name += ' quiz--answer-incorrect';
		}
		
		return name;
	}
	
	let answerElements = props.data.answers.map((answer) => (
		<button
			className={decideClassNameFor(answer)}
			onClick={props.selectAnswer}
			id={answer.id}
			key={answer.id}
			dangerouslySetInnerHTML={{ __html: answer.text }}
		/>
	))
	
	return (
		<div className="quiz--question">
			<div dangerouslySetInnerHTML={{ __html: props.data.question }} />
			<div className="quiz--answers">{answerElements}</div>
			<hr />
		</div>
	);
}

export default Quiz;
