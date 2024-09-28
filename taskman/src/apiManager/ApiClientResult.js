class ApiClientResult {
	
	constructor(){
		this.error=0;
		this.errorMessage="";
		this.errorReason=0;
		this.apiResponse="";
	}

    isError() {return this.error;}
	setError(error) {this.error = error;}

	getErrorMessage() {return this.errorMessage;}
	setErrorMessage( errorMessage) {this.errorMessage = errorMessage;}
		
	getErrorReason() {return this.errorReason;}
	setErrorReason(errorReason) {this.errorReason = errorReason;}

	getApiResponse() {return this.apiResponse;}
	setApiResponse(apiResponse) {this.apiResponse = apiResponse;}

}



export default ApiClientResult;