/**
 * View Module
 *
 * @module view
 * @author Ondrej Blazek, Cecilia Ritzen
 * @requires module:controller
 * @requires Language
 * @requires Widget
 * @requires jQuery
 *
 * @version 1.0.0
 * 
 */
ModularMVC.registerView('view', function(Controller, LanguageModule, Widget, $) {

	/* public methods */

	var interFace = {
		/**
		 * onDomReady is triggered by the framework automatically as soon as the DOM is ready (fully loaded).
		 * click events are set
		 *	
		 * @public
		 * @memberOf module:view
		 * @see {@link module:view_setClickEvents}
		 */

		onWidgetReady: function() {
			LanguageModule().translatePage('home');
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
		        if (indexOfQuestions===0){  
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
	 * sets click event for START button 
	 * @private
	 * @memberOf module:view
	 * @see {@link module:controller.userInterestsDataAsked}
	 */
    _setClickEvents = function() {
		//debug('inside click event');
		//debug('View _setClickEvents(): set click event for button#button_show_interests');
		$('#languageSwitch').click(function(){
			if(Widget().getPreference('lang') === "en"){
				Widget().setPreference('lang', 'de');
				location.reload();	
			}
			else{
				Widget().setPreference('lang', 'en');
				LanguageModule().translatePage('home');
				location.reload();
			}
		});

        $('.starts').click(function(){
        	Controller().getAppData();
        	debug(Widget().getPreference('lang'));
        	LanguageModule().translatePage('start');
			$('#next').show();
    		$('#setRunner').runner();
    		$('#setRunner').runner('start');	 
        });
        $('#results').click(function(){
        	LanguageModule().translatePage('result');
        	$('#setRunner').runner('stop');
        	$('#getRunner').html('Your time: '+ $('#setRunner').runner('lap'));
      	}); //end of result

         
    };

  //   _setPageInitEvent = function() {
		
		// //debug('View _setPageInitEvent(): set jQuery mobile init event for page interests');
  //       $("#home").bind('pageinit', function() {
		// 	//debug('View pageinit Event triggered: notice the Controller that the user wants to see the Interests data');
		// 	LanguageModule().translatePage('home');
  //       });
  //   };
	
	/* end of private methods */

	//debug('view.interestsdata loaded');
    return interFace;
}(ModularMVC.Controller('controller'), ModularMVC.MVCHelper('Language'), ModularMVC.MVCHelper('Widget'), jQuery));