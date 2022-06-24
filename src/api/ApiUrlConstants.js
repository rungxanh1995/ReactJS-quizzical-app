class ApiUrlConstants {
	geographyQuizUrl = "https://opentdb.com/api.php?amount=5&category=22&type=multiple";
	
	getUrl(/*string*/ quizType) {
		switch (quizType) {
			case "geography":
				return this.geographyQuizUrl;
			default:
				return "";
		}
	}
}

export default ApiUrlConstants;