class Http {
	URL = 'https://1ff6007222bdc06f.mokky.dev'
	constructor() { }

	async post(resource, params) {
		try {
			const response = await fetch(`${this.URL}${resource}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-type": "application/json"
				},
				body: JSON.stringify(params)
			})
			return await response.json();
		} catch (error) {
			console.log(error)
		}
	}
	async get(resource) {
		try {
			const res = await fetch(`${this.URL}${resource}`);
			return await res.json();
		} catch (error) {
				console.log(error);
		}
	}
}
const http = new Http();
export { http }
