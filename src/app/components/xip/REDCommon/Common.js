const Common = {
	CommonApi : async(url, param) => {
		try{
			let apiurl = 'http://localhost:8080' + url
			let result = [];
			await fetch(apiurl, 
			{
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(param)
			}).then(response => 
				response.json()
			).then(json  => {
				console.log('json==>', json)
				result = json
			});
			return result
		} catch (error) {
			console.log(error)
			return -1;
		}
	}	
}

export default Common;