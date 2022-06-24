class ApiService {
	
	constructor(/*string*/ url) {
		this.apiUrl = url;
	}
	
	fetchData() {
		return fetch(this.apiUrl).then(response => response.json());
	}
}

export default ApiService;