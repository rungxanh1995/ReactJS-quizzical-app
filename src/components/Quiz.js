import React from "react";

function Quiz(/*object*/ props) {
	
	return (
		<div>
			<h3>{props.question}</h3>
			<div>
				<p>{props.correctAnswer}</p>
				{props.incorrectAnswers.map(incorrectAnswer => {
					return <p>{incorrectAnswer}</p>
				})}
			</div>
		</div>
	);
}

export default Quiz;
