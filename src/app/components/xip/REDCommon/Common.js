
export default {

    CommonApi: async(url, param) => {
		try {
			let result = [];
			await fetch(url, 
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
		
    },
	
}