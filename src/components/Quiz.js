import React from "react";

function Quiz(/*object*/ props) {
	
	const className = (answer) => {
		let name = 'quiz--answer-btn'
		if (props.hasCheckedAnswers) {
			name += ' quiz--answer-checking'
			if (answer.text === props.data.correctAnswer) {
				name += ' quiz--answer-correct'
			} else if (answer.isSelected) {
				name += ' quiz--answer-incorrect'
			}
		} else if (answer.isSelected) {
			name += ' quiz--answer-selected'
		}
		return name
	}
	
	let answerElements = props.data.answers.map((answer) => (
		<button
			className={className(answer)}
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
