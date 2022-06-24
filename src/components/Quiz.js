import React from "react";

function Quiz(/*object*/ props) {
	
	const className = (answer) => {
		let name = 'answer--lbl'
		if (props.hasCheckedAnswers) {
			name += ' answer--checking'
			if (answer.text === props.data.correctAnswer) {
				name += ' answer--correct'
			} else if (answer.isSelected) {
				name += ' answer--incorrect'
			}
		} else if (answer.isSelected) {
			name += ' answer--selected'
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
		<div className="question">
			<div dangerouslySetInnerHTML={{ __html: props.data.question }} />
			<div className="answers">{answerElements}</div>
			<hr />
		</div>
	);
}

export default Quiz;
