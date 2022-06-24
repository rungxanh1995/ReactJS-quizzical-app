import React from "react";

function Quiz(/*object*/ props) {
	
	function decideClassNameFor(/* string */ anAnswer) {
		const hasSelectedAnswers = anAnswer.isSelected;
		const isAnswerCorrect = props.hasCheckedAnswers && (anAnswer.text === props.data.correctAnswer);
		const isAnswerIncorrect = props.hasCheckedAnswers && anAnswer.isSelected;
		
		let className = 'quiz--answer-btn';
		
		if (hasSelectedAnswers) {
			className += ' quiz--answer-selected';
		}
		
		if (isAnswerCorrect) {
			className += ' quiz--answer-correct';
		}
		
		if (isAnswerIncorrect) {
			className += ' quiz--answer-incorrect';
		}
		
		return className;
	}
	
	let answerElements = props.data.answers.map(eachAnswer => (
		<button
			className={decideClassNameFor(eachAnswer)}
			onClick={props.selectAnswer}
			id={eachAnswer.id}
			key={eachAnswer.id}
			dangerouslySetInnerHTML={{ __html: eachAnswer.text }}
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
