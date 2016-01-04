ModularMVC.registerController('controller', function (View, Widget) {
	
	/* public methods */
    var interFace = {
    	/**
    	 * retrieves the user's interest data from model if exists otherwise from sample API
    	 * @see {@link module:model-interestsdata.getInterests}
    	 * @see {@link module:model-interestsdata.setInterests}
		 * @see {@link module:helper-serverapi.getUserInterests}
		 * @see {@link module:view-interestsdata.showUserInterestsData}
		 *
		 * @public
		 * @memberOf module:controller-interestsdata
    	 */
    	//  onRegister: function() {
    	// // 	//debug('***********************');
    	// // 	//debug('Controller - Registered');
    	//  },
    	//  onDomReady: function() {
    	// // 	//debug('Controller - DomReady');
    	//  },

    	//  onWidgetReady: function() {
    	// // 	//debug('Controller - WidgetReady');
    		
    	//  },

		getAppData: function() {
			var indexOfQuestions = 0, indexOfHelperArray = 1;
    		var num1 = 0, num2 = 0, num3 = 0, num4 = 0;
			//debug('Controller - inside getAppData');
			jQuery.getJSON('js/questions.json', function(array){
				var a1, w = 0;
	        	var array1 = [];
	        	var array2 = []; 
				//debug('test: '+array.questions[indexOfQuestions].q[0]);	
				View().viewPics(array, indexOfQuestions);
				
	          
	          	for(var k = 0; k < 42; k++){ //filling the array with numbers and actual setting the length of an array1
	            	array1[k] = k+1;
	          	}

	          	for(var y = 0; y < 42; y ++)
	          	{	

	            var x = Math.floor(Math.random()*4+1);              //generating num 1-4 for radiobutt (right answer) 
	            // if(x==0)
	            //   console.log('ERROR X == 0');
	             
	            array2[x+w] = array.questions[indexOfQuestions].q[1];      //putting the right answer into the array2 with index x+w
	            
	            a1 = array.questions[indexOfQuestions].q[1];
	            
	            var num = Math.floor(Math.random() * array1.length);
	            // while(num == 0)
	            //   num = Math.floor(Math.random() * array1.length+1);
	            num1 = 0; num2 = 0; num3 = 0; num4 = 0;
	            //console.log('num pred forem 1-5: '+num+' '+array.mix[num]);
	            for(var l = 1; l < 5; l ++)
	            {

	                  if(x !== l)
	                  {
	                                 
	                    if(a1.localeCompare(array.questions[num].q[1]) === 0)
	                    {
	                      while(a1.localeCompare(array.questions[num].q[1]) === 0){
	                      	num = Math.floor(Math.random() * array1.length);
	                      }
	                        
	                      // while(num == 0)
	                      //   num = Math.floor(Math.random() * array1.length+1);
	                      
	                      //$('label[for=radio'+k+']').html(array.mix[num]);
	                      array2[l+w] = array.questions[num].q[1];
	                      num = Math.floor(Math.random() * array1.length);
	                      while(a1.localeCompare(array.questions[num].q[1]) === 0){
	                      	num = Math.floor(Math.random() * array1.length);
	                      }
	                        
	                    } //end of local compare.. 
	                    
	                    else
	                    {
	                      //$('label[for=radio'+k+']').html(array.mix[num]);
	                      array2[l+w] = array.questions[num].q[1];
	                      switch(l){
	                      case 1:
	                        num1 = num;
	                        break;
	                      case 2:
	                        num2 = num;
	                        break;
	                      case 3:
	                        num3 = num;
	                        break;
	                      case 4:
	                        num4 = num;
	                        break;
	                      default: 
	                        break;
	                      } //end of switch
	                      num = Math.floor(Math.random() * array1.length);
	                      //console.log('num ve foru 1-5: '+num+' '+y+' '+array.mix[num]);
	                      while(num1===num || num2===num || num3===num || num4===num)
	                      {
	                        num = Math.floor(Math.random() * array1.length);
	                        //console.log('num pokud by predchozi bylo stejny: '+num+' '+y);
	                      }
	                      
	     
	                      
	                    }// end of else.. if the name of the country is not already there.. 
	                  } //end of if(x != k)
	                  else
	                  { // if x == k

	                  } //end of else
	            }//end of for loop
	            indexOfQuestions++;
	            w += 4;
	            
	          }//end of first for
	          
	          View().viewLabels(array2, indexOfHelperArray);
			});	//end of getJSON
		}, //end of getAppData
		
		nextClicked: function(array2, indexOfHelperArray){
			//debug('next clicked');
			indexOfHelperArray+=4;
			View().viewLabels(array2, indexOfHelperArray);

		}
	};
	
	/* end of public methods */
	
	
	/* private methods */
    
	/* end of private methods */
	
	//debug('controller loaded');
    return interFace;
}(ModularMVC.View('view'), ModularMVC.MVCHelper('Widget'))); //ModularMVC.Model('model'), ModularMVC.Helper('helper.serverapi')
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
/*!
 * jQuery-runner - v2.3.3 - 2014-08-06
 * https://github.com/jylauril/jquery-runner/
 * Copyright (c) 2014 Jyrki Laurila <https://github.com/jylauril>
 */
(function() {
  var Runner, formatTime, meta, pad, runners, uid, _$, _requestAnimationFrame, _uid;

  meta = {
    version: "2.3.3",
    name: "jQuery-runner"
  };

  _$ = this.jQuery || this.Zepto || this.$;

  if (!(_$ && _$.fn)) {
    throw new Error('[' + meta.name + '] jQuery or jQuery-like library is required for this plugin to work');
  }

  runners = {};

  pad = function(num) {
    return (num < 10 ? '0' : '') + num;
  };

  _uid = 1;

  uid = function() {
    return 'runner' + _uid++;
  };

  _requestAnimationFrame = (function(win, raf) {
    return win['r' + raf] || win['webkitR' + raf] || win['mozR' + raf] || win['msR' + raf] || function(fn) {
      return setTimeout(fn, 30);
    };
  })(this, 'equestAnimationFrame');

  formatTime = function(time, settings) {
    var i, len, ms, output, prefix, separator, step, steps, value, _i, _len;
    settings = settings || {};
    steps = [3600000, 60000, 1000, 10];
    separator = ['', ':', ':', '.'];
    prefix = '';
    output = '';
    ms = settings.milliseconds;
    len = steps.length;
    value = 0;
    if (time < 0) {
      time = Math.abs(time);
      prefix = '-';
    }
    for (i = _i = 0, _len = steps.length; _i < _len; i = ++_i) {
      step = steps[i];
      value = 0;
      if (time >= step) {
        value = Math.floor(time / step);
        time -= value * step;
      }
      if ((value || i > 1 || output) && (i !== len - 1 || ms)) {
        output += (output ? separator[i] : '') + pad(value);
      }
    }
    return prefix + output;
  };

  Runner = (function() {
    function Runner(items, options, start) {
      var id;
      if (!(this instanceof Runner)) {
        return new Runner(items, options, start);
      }
      this.items = items;
      id = this.id = uid();
      this.settings = _$.extend({}, this.settings, options);
      runners[id] = this;
      items.each(function(index, element) {
        _$(element).data('runner', id);
      });
      this.value(this.settings.startAt);
      if (start || this.settings.autostart) {
        this.start();
      }
    }

    Runner.prototype.running = false;

    Runner.prototype.updating = false;

    Runner.prototype.finished = false;

    Runner.prototype.interval = null;

    Runner.prototype.total = 0;

    Runner.prototype.lastTime = 0;

    Runner.prototype.startTime = 0;

    Runner.prototype.lastLap = 0;

    Runner.prototype.lapTime = 0;

    Runner.prototype.settings = {
      autostart: false,
      countdown: false,
      stopAt: null,
      startAt: 0,
      milliseconds: true,
      format: null
    };

    Runner.prototype.value = function(value) {
      this.items.each((function(_this) {
        return function(item, element) {
          var action;
          item = _$(element);
          action = item.is('input') ? 'val' : 'text';
          item[action](_this.format(value));
        };
      })(this));
    };

    Runner.prototype.format = function(value) {
      var format;
      format = this.settings.format;
      format = _$.isFunction(format) ? format : formatTime;
      return format(value, this.settings);
    };

    Runner.prototype.update = function() {
      var countdown, delta, settings, stopAt, time;
      if (!this.updating) {
        this.updating = true;
        settings = this.settings;
        time = _$.now();
        stopAt = settings.stopAt;
        countdown = settings.countdown;
        delta = time - this.lastTime;
        this.lastTime = time;
        if (countdown) {
          this.total -= delta;
        } else {
          this.total += delta;
        }
        if (stopAt !== null && ((countdown && this.total <= stopAt) || (!countdown && this.total >= stopAt))) {
          this.total = stopAt;
          this.finished = true;
          this.stop();
          this.fire('runnerFinish');
        }
        this.value(this.total);
        this.updating = false;
      }
    };

    Runner.prototype.fire = function(event) {
      this.items.trigger(event, this.info());
    };

    Runner.prototype.start = function() {
      var step;
      if (!this.running) {
        this.running = true;
        if (!this.startTime || this.finished) {
          this.reset();
        }
        this.lastTime = _$.now();
        step = (function(_this) {
          return function() {
            if (_this.running) {
              _this.update();
              _requestAnimationFrame(step);
            }
          };
        })(this);
        _requestAnimationFrame(step);
        this.fire('runnerStart');
      }
    };

    Runner.prototype.stop = function() {
      if (this.running) {
        this.running = false;
        this.update();
        this.fire('runnerStop');
      }
    };

    Runner.prototype.toggle = function() {
      if (this.running) {
        this.stop();
      } else {
        this.start();
      }
    };

    Runner.prototype.lap = function() {
      var lap, last;
      last = this.lastTime;
      lap = last - this.lapTime;
      if (this.settings.countdown) {
        lap = -lap;
      }
      if (this.running || lap) {
        this.lastLap = lap;
        this.lapTime = last;
      }
      last = this.format(this.lastLap);
      this.fire('runnerLap');
      return last;
    };

    Runner.prototype.reset = function(stop) {
      var nowTime;
      if (stop) {
        this.stop();
      }
      nowTime = _$.now();
      if (typeof this.settings.startAt === 'number' && !this.settings.countdown) {
        nowTime -= this.settings.startAt;
      }
      this.startTime = this.lapTime = this.lastTime = nowTime;
      this.total = this.settings.startAt;
      this.value(this.total);
      this.finished = false;
      this.fire('runnerReset');
    };

    Runner.prototype.info = function() {
      var lap;
      lap = this.lastLap || 0;
      return {
        running: this.running,
        finished: this.finished,
        time: this.total,
        formattedTime: this.format(this.total),
        startTime: this.startTime,
        lapTime: lap,
        formattedLapTime: this.format(lap),
        settings: this.settings
      };
    };

    return Runner;

  })();

  _$.fn.runner = function(method, options, start) {
    var id, runner;
    if (!method) {
      method = 'init';
    }
    if (typeof method === 'object') {
      start = options;
      options = method;
      method = 'init';
    }
    id = this.data('runner');
    runner = id ? runners[id] : false;
    switch (method) {
      case 'init':
        new Runner(this, options, start);
        break;
      case 'info':
        if (runner) {
          return runner.info();
        }
        break;
      case 'reset':
        if (runner) {
          runner.reset(options);
        }
        break;
      case 'lap':
        if (runner) {
          return runner.lap();
        }
        break;
      case 'start':
      case 'stop':
      case 'toggle':
        if (runner) {
          return runner[method]();
        }
        break;
      case 'version':
        return meta.version;
      default:
        _$.error('[' + meta.name + '] Method ' + method + ' does not exist');
    }
    return this;
  };

  _$.fn.runner.format = formatTime;

}).call(this);

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
ModularMVC.registerView('view', function (Controller, $) {

	/* public methods */

	var interFace = {
		/**
		 * onDomReady is triggered by the framework automatically as soon as the DOM is ready (fully loaded).
		 * click events are set
		 *	
		 * @public
		 * @memberOf module:view-interestsdata
		 * @see {@link module:view-interestsdata._setClickEvents}
		 */
		//  onRegister: function() {
		// // 	//debug('View - Registered');
		//  },

		//  onDomReady: function() {
		// // 	//debug('View - DomReady');
		// // 	//Controller().getAppData();
		// // 	//_setClickEvents();
		//  },

		onWidgetReady: function() {
			//debug('View - WidgetReady');
			_setClickEvents();
		},

		viewPics: function(array, indexOfQuestions) {
			//debug('viewSomething - ************ - cool huh?');
			$("input:radio[name=radio-choice]").prop("checked", false).checkboxradio( "refresh" );
			$('#head2').text(array.questions[indexOfQuestions].q[0]);
            $('#img_1').attr('src', array.questions[indexOfQuestions].img[0]);  
           	$('#img_2').attr('src', array.questions[indexOfQuestions].img[1]);
           	
           	$('#next').click(function(){
           		indexOfQuestions++;
				if(indexOfQuestions>0){
					$('#back').show();	
				}
	            
	          	
				if(indexOfQuestions === 41){
					$('#next').hide();
				}
	           	
			    $('#head2').text(array.questions[indexOfQuestions].q[0]);
	            $('#img_1').attr('src', array.questions[indexOfQuestions].img[0]);  
	           	$('#img_2').attr('src', array.questions[indexOfQuestions].img[1]);		
        	});
		},

		viewLabels: function(array2, indexOfHelperArray) {
			$('label[for=radio1]').html(array2[indexOfHelperArray]);
      		$('label[for=radio2]').html(array2[indexOfHelperArray+1]);
      		$('label[for=radio3]').html(array2[indexOfHelperArray+2]);
		    $('label[for=radio4]').html(array2[indexOfHelperArray+3]);
		    $('#radio1').attr('value', array2[indexOfHelperArray]);
		    $('#radio2').attr('value', array2[indexOfHelperArray+1]);
		    $('#radio3').attr('value', array2[indexOfHelperArray+2]);
		    $('#radio4').attr('value', array2[indexOfHelperArray+3]);

		    $('#next').click(function(){
		    	indexOfHelperArray+=4;
        		$('label[for=radio1]').html(array2[indexOfHelperArray]);
	      		$('label[for=radio2]').html(array2[indexOfHelperArray+1]);
	      		$('label[for=radio3]').html(array2[indexOfHelperArray+2]);
			    $('label[for=radio4]').html(array2[indexOfHelperArray+3]);
			    $('#radio1').attr('value', array2[indexOfHelperArray]);
			    $('#radio2').attr('value', array2[indexOfHelperArray+1]);
			    $('#radio3').attr('value', array2[indexOfHelperArray+2]);
			    $('#radio4').attr('value', array2[indexOfHelperArray+3]);	
        	});
		}

		
	},
	/* end of public methods */
	
	
	/* private methods */
	/**
	 * sets click event for interest button 
	 * @private
	 * @memberOf module:view-interestsdata
	 * @see {@link module:controller-interestsdata.userInterestsDataAsked}
	 */
    _setClickEvents = function() {
		//debug('inside click event');
		//debug('View _setClickEvents(): set click event for button#button_show_interests');
        $('.starts').click(function(){
        	Controller().getAppData();
			$('#next').show();
    		$('#setRunner').runner();
    		$('#setRunner').runner('start');	 
        });

         
    };
	
	/* end of private methods */

	//debug('view.interestsdata loaded');
    return interFace;
}(ModularMVC.Controller('controller'), jQuery));