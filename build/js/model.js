/**
 * Model Module interestsdata
 *
 * @module model-interestsdata
 * @author Behnam Taraghi <b.taraghi@tugraz.at>
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
ModularMVC.registerModel('model', function () {

	/* public methods */
	var interFace = {
		/**
    	 * saves user interests in a local variable
    	 *
    	 * @param {json} i - user interests data
    	 * @see {@link module:model-interestsdata._user_interests}
		 *
		 * @public
		 * @memberOf module:model-interestsdata
    	 */
	    setInterests: function(i) {
			debug('Model setInterest: set the user interests');
			_user_interests = i;
		},
		/**
    	 * returns the user interests data
    	 *
    	 * @see {@link module:model-interestsdata._user_interests}
		 *
		 * @public
		 * @memberOf module:model-interestsdata
		 * @return {json} user interests data
    	 */
	    getInterests: function() {
			debug('Model getInterests: return the user interests');
			return _user_interests;
		}
	},
	
	
	/* private methods */
	/**
	 * local variabel to save data
	 * @type {json|null}
	 * @private
	 * @default null
	 * @memberOf module:model-interestsdata
	 */
	_user_interests = null;
	
	//debug('model.interestsdata loaded');
    return interFace;
}());