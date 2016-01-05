/**
 * View Module
 *
 * @module view
 * @author Ondrej Blazek, Cecilia Ritzen
 * @requires module:controller
 * @requires jQuery
 *
 * @version 1.0.0
 * 
 */
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
           		if($("input:radio[name=radio-choice]:checked").attr('value')===array.questions[indexOfQuestions].q[1]){
            		$('#rightAnswers').css("color", "#00ff00");
            		$('#rightAnswers').append((indexOfQuestions+1)+'. Answer correct : '+array.questions[indexOfQuestions].q[1]+'<br>');
          		}
          		else{
            		$('#wrongAnswers').css("color", "red");
           			$('#wrongAnswers').append((indexOfQuestions+1)+'. Answer incorrect: '+$("input:radio[name=radio-choice]:checked").attr('value')+'<br>');  
          		}

          		$("input:radio[name=radio-choice]").prop("checked", false).checkboxradio( "refresh" );

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

			$('#back').click(function()
      		{
		        if(indexOfQuestions < 42){
		        	$('#next').show();	
		        }
		          
		        if(indexOfQuestions>=1){
		          indexOfQuestions--;    
		            
		        }
		        if (indexOfQuestions==0){  
		            $('#back').hide(); 
		          }
		        $("input:radio[name=radio-choice]").prop("checked", false).checkboxradio( "refresh" );      
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

        	$('#back').click(function(){
        		if(indexOfHelperArray>=1){
		          indexOfHelperArray-=4;  
		        }
        		$('label[for=radio1]').html(array2[indexOfHelperArray]);
		        $('label[for=radio2]').html(array2[indexOfHelperArray+1]);
		        $('label[for=radio3]').html(array2[indexOfHelperArray+2]);
		        $('label[for=radio4]').html(array2[indexOfHelperArray+3]);
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
        $('#results').click(function(){
        	$('#setRunner').runner('stop');
        	$('#getRunner').html('Your time: '+ $('#setRunner').runner('lap'));
      	}); //end of result

         
    };
	
	/* end of private methods */

	//debug('view.interestsdata loaded');
    return interFace;
}(ModularMVC.Controller('controller'), jQuery));