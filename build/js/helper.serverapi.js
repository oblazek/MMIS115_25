/**
 * Helper Module serverapi
 *
 * @module helper-serverapi
 * @author Ondrej Blazek, Cecilia Ritzen
 * @requires Widget
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
ModularMVC.registerHelper('helper.serverapi', function (Widget) { 
	/* public methods */
	var interFace = {
    	/**
    	 * retrieves the user's profile data from sample API
    	 * @public
		 * @memberOf module:helper-serverapi
		 * @param  {number}   user_id - user id
		 * @param  {module:helper-serverapi~successCallback} callback - success callback
		 * @param  {module:helper-serverapi~errorCallback} errorcallback - error callback
		 * @see {@link module:helper.serverapi._sendRequest}
    	 */
		getUserProfileData: function(user_id, callback, errorcallback){
			debug("helper.serverapi getUserProfileData: send a xhr request to fetch profile data from web service");
			var param = {
				"user_id": user_id, 
				"action":'getUserProfileData'
			};
			_sendRequest(param, callback, errorcallback);
		},
		/**
    	 * retrieves the user's interest data from sample API
    	 * @public
		 * @memberOf module:helper-serverapi
		 * @param  {number}   user_id - user id
		 * @param  {module:helper-serverapi~successCallback} callback - success callback
		 * @param  {module:helper-serverapi~errorCallback} errorcallback - error callback
		 * @see {@link module:helper.serverapi._sendRequest}
    	 */
		getUserInterests: function(user_id, callback, errorcallback){
			debug("helper.serverapi getUserInterests: send a xhr request to fetch user interests from web service");
			var param = {
				"user_id": user_id, 
				"action":'getUserInterests'
			};
			_sendRequest(param, callback, errorcallback);
		}
		
		/* end of public methods */
	},
	
	
	
	
	/* private methods */
	/**
	 * Path to the API
	 * @type {string}
	 * @private
	 * @default
	 * @memberOf module:helper-serverapi
	 */
	_SERVICE_URL = 'sampleAPI/',

	/**
	 * sends a GET request to the sample API, expecting a JSON response
	 * @see {@link module:helper-serverapi._SERVICE_URL}
	 * @private
	 * @memberOf module:helper-serverapi
	 * @param  {json} parameter - GET parameters
	 * @param  {module:helper-serverapi~successCallback} callback - success callback
	 * @param  {module:helper-serverapi~errorCallback} errorcallback - error callback
	 */
	_sendRequest = function(){};

	_sendRequest = function(parameter, callback, errorcallback){
		var local_resource = parameter.action === 'getUserProfileData' ? 'profile.json' : 'interests.json';
		Widget().httpGetJSON(
			_SERVICE_URL + local_resource, 
			parameter, 
			function(jsonData) {
				debug("helper.serverapi _sendRequest: the response has just arrived!");
				debug(jsonData);
				
				if(typeof jsonData.error !== 'undefined') {
					debug('Server reported the following error while processing the request: ' + jsonData.error);
					errorcallback('An error occurred. Please try again!');
					return;
				}
				
				callback(jsonData);
			},
			function(xhr, textStatus, e) {
				debug('Request failed: ' + e);
				errorcallback('An unexpected error occurred.');
			}
		);
	}; 
	
	/* end of private methods */
	/**
	 * @callback module:helper-serverapi~successCallback
	 * @param {json} data - API response
	 */
	
	/**
	 * @callback module:helper-serverapi~errorCallback
	 * @param {Object} jqXHR - jQuery XHR Object
	 * @param {string|null} textStatus - type of error
	 * @param {string} errorThrown - description of error
	 */
	//debug('helper.serverapi loaded');
	return interFace;
}(ModularMVC.MVCHelper('Widget')));