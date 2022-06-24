export function CheckAnswers(/* Object */ props) {
	return (
		<button className="btn btn--quiz-screen-main" onClick={props.checkAnswers}>
			Check answers
		</button>
	);
}
