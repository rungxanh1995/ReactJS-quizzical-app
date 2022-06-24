import React from "react";

function Quiz(/*object*/ props) {
	
	const answerElements = props.allAnswers.map(answer => {
		return <p key={answer.id}>{answer.text}</p>
	})
	
	return (
		<div>
			<h3>{props.question}</h3>
			<div>
				{answerElements}
			</div>
		</div>
	);
}

export default Quiz;
