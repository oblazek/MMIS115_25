/**
 * Controller Module
 *
 * @module controller-interestsdata
 * @author Behnam Taraghi <b.taraghi@tugraz.at>
 * @requires module:model-interestsdata
 * @requires module:view-interestsdata
 * @requires module:helper-serverapi
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
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