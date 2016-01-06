/**
 * Model Module
 *
 * @module model
 * @author Ondrej Blazek <oblazek@student.tugraz.at>
 * @author Cecilia Ritzén <critzen@student.tugraz.at>
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
ModularMVC.registerModel('model', function () {

	/* public methods */
	var interFace = {
		/**
    	 * Saves json data in a local variable
    	 *
    	 * @param {json} dataFromServer - data from the server
    	 * 
		 *
		 * @public
		 * @memberOf module:model
    	 */
	    setJSONData: function(dataFromServer) {
			
			cachedJsonData = dataFromServer;
			
		},
		/**
    	 * Returns the json data, if they are stored locally. 
    	 *
		 * @public
		 * @memberOf module:model
		 * @return {json} user interests data
    	 */
	    getJSONData: function() {
			if(cachedJsonData != null){
				//debug('Loaded from cache.');
			}
			return cachedJsonData;
		}
	},
	
	
	/* private methods */
	/**
	 * local variabel to save data
	 * @type {json|null}
	 * @private
	 * @default null
	 * @memberOf module:model
	 */
	cachedJsonData = null;
	
    return interFace;
}({}));