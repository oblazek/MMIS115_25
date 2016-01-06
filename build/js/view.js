/**
 * View Module
 *
 * @module view
 * @author Ondrej Blazek <oblazek@student.tugraz.at> 
 * @author Cecilia Ritzén <critzen@student.tugraz.at>
 * @requires module:controller
 * @requires Language
 * @requires Widget
 * @requires jQuery
 *
 * @version 1.0.0
 * @license Apache-2.0
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
		 * @see {@link module:view._setClickEvents}
		 */

		onWidgetReady: function() {
			LanguageModule().translatePage('home');
			_setClickEvents();
		},


		/**
		* 
		* When called the function will display in corresponding DOMs data/pictures - links are taken from the array (json data). 
		* Function as well compares, everytime the button 'Next' is clicked, the selected value of the radio inputs with the value (right answer) taken from the json data. 
		* Based on this the results are updated. 
		* @param array {json} data
		* @param indexOfQuestions {number}
		* @public
		* @memberOf module:view
		*/
		viewPics: function(array, indexOfQuestions) {
			
			Widget().trace();

			$("input:radio[name=radio-choice]").prop("checked", false).checkboxradio( "refresh" );
			$('#head2').text(array.questions[indexOfQuestions].q[0]);
            $('#img_1').attr('src', array.questions[indexOfQuestions].img[0]);  
           	$('#img_2').attr('src', array.questions[indexOfQuestions].img[1]);

           	$('#next').click(function(){
           		if($("input:radio[name=radio-choice]:checked").attr('value')===array.questions[indexOfQuestions].q[1]){
           			
            		$('#rightAnswers').css("color", "#00ff00");
            		$('#rightAnswers').append((indexOfQuestions+1)+': '+array.questions[indexOfQuestions].q[1]+'<br>');
          		}
          		else{
          			
            		$('#wrongAnswers').css("color", "red");
           			$('#wrongAnswers').append((indexOfQuestions+1)+': '+$("input:radio[name=radio-choice]:checked").attr('value')+'<br>');  
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
		/**
		* 
		* When called the function will change the value of four labels with values taken from the array2 (helper array).
		* The attributes of the radio inputs are updated, everytime 'Next' button is clicked, so they can then be checked for the selected answer.
		* @param array2 {json} data
		* @param indexOfHelperArray {number}
		* @public
		* @memberOf module:view
		*/
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
	 * Sets click events for Language Switch button, for Start button and for Results.
	 * If the language switcher is pressed, the widget 'lang' preference will be changed and the '.translatePage'
	 * function from the Language Module will be called so the data are translated and modified, depending on the preference.
	 * The external jquery plugin runner/stopwatch.
	 * @private
	 * @memberOf module:view
	 * @see {@link module:controller.getAppData}
	 * @see {@link https://github.com/jylauril/jquery-runner/ Runner/Stopwatch}
	 */
	 
    _setClickEvents = function() {
		
		$('#languageSwitch').click(function(){
			if(Widget().getPreference('lang') === "en"){
				Widget().setPreference('lang', 'de');
				location.reload(false);	
			}
			else{
				Widget().setPreference('lang', 'en');
				LanguageModule().translatePage('home');
				location.reload(false);
			}
		});

        $('.starts').click(function(){
        	Controller().getAppData();
        	
        	LanguageModule().translatePage('start');
			$('#next').show();
    		$('#setRunner').runner();
    		$('#setRunner').runner('start');	 
        });
        $('#results').click(function(){

        	LanguageModule().translatePage('result');
        	$('#setRunner').runner('stop');
        	$('#getRunner').append($('#setRunner').runner('lap'));
        
      	});   
    };

	/* end of private methods */	
	
    return interFace;
}(ModularMVC.Controller('controller'), ModularMVC.MVCHelper('Language'), ModularMVC.MVCHelper('Widget'), jQuery));