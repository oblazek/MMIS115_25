/**
 * Helper Module serverapi
 *
 * @module helper-serverapi
 * @author Ondrej Blazek <oblazek@student.tugraz.at> 
 * @author Cecilia Ritzen <critzen@student.tugraz.at>
 * @requires Widget
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
ModularMVC.registerHelper('helper.serverapi', function (Widget) { 
	/* public methods */
	var interFace = {
    	/**
    	 * retrieves JSON data from URL
    	 * @public
		 * @memberOf module:helper-serverapi
		 * @param  {module:helper-serverapi~successCallback} callback - success callback
		 * @param  {module:helper-serverapi~errorCallback} errorcallback - error callback
		 * @see {@link module:helper-serverapi._sendRequest}
		 * @see {@link module:helper-serverapi.URL}
    	 */
		getServerData: function(callback, errorcallback){
			_sendRequest(callback, errorcallback);
		}

		/* end of public methods */
	},
	
	
	/* private methods */
	/**
	 * Path to the json files
	 * @type {string}
	 * @private
	 * @default
	 * @memberOf module:helper-serverapi
	 */
	URL = 'js/',

	/**
	 * sends a GET HTTP request to the URL+source (based on Widget 'lang' preferences) and gets a Json object (german/english version) response
	 * @see {@link module:helper-serverapi.URL}
	 * @private
	 * @memberOf module:helper-serverapi
	 * @param  {module:helper-serverapi~successCallback} callback - success callback
	 * @param  {module:helper-serverapi~errorCallback} errorcallback - error callback
	 */
	

	_sendRequest = function(callback, errorcallback){
		
		var source = Widget().getPreference('lang') === 'en' ? 'questions.json' : 'fragen.json';
		jQuery.getJSON(URL+source, function(jsonData) {
				callback(jsonData);
				//document.getElementById('head2').innerHTML = "cmoooooon";
			}	
		)
		.fail(function() {
    		errorcallback("Couldn't get data from the server!");
    		debug("error");
  		});
	}; 
	
	/* end of private methods */
	/**
	 * @callback module:helper-serverapi~successCallback
	 * @param {json} data
	 */
	
	/**
	 * @callback module:helper-serverapi~errorCallback
	 * @param {string} errorThrown - description of error
	 */
	
	return interFace;
}(ModularMVC.MVCHelper('Widget')));