/**
 * Controller Module
 *
 * @module controller
 * @author Ondrej Blazek <oblazek@student.tugraz.at> 
 * @author Cecilia Ritzen <critzen@student.tugraz.at>
 * @requires module:view
 * @requires module:model
 * @requires module:helper-serverapi
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
ModularMVC.registerController('controller', function (View, Model, Request) {
	
	/* public methods */
    var interFace = {
    	
    	/**
    	 * Retrieves the JSON data from model if exists, if not -> from server and send the resulting data to the view model.
		
			    	 * After sucessfull getting of data, the function will randomly generate number 1-4 for the right answer, then 
			    	 * it will create a helper array where the right answer will be put. The random generation of the other answers 
			    	 * will follow and those answers will also be put into the helper array for later use.
			    	 * These steps will be repeated depending on the length of the json data.  
			    	 * Finally the function will send the helper array to the view model.
					 *
					 * @see {@link module:view.viewLabels}
					 * @see {@link module:model.getJSONData}
    				 * @see {@link module:model.setJSONData}
		 			 * @see {@link module:helper-serverapi.getServerData}
		 			 * @see {@link module:view.viewPics}
					 * @public
					 * @memberOf module:controller

		 *
		 */

		getAppData: function() {

			var jsonData = Model().getJSONData();
			var lengthOfTheJsonFile = 42;
			var indexOfQuestions = 0, indexOfHelperArray = 1;
    		var num1 = 0, num2 = 0, num3 = 0, num4 = 0;

			if(jsonData == null) {
				
				Request().getServerData(function(serverJsonData){
					
					Model().setJSONData(serverJsonData);

					var a1, w = 0;
		        	var array1 = [];
		        	var array2 = []; 
						
					View().viewPics(serverJsonData, indexOfQuestions);
					
		          
		          	for(var k = 0; k < lengthOfTheJsonFile; k++){ //filling the array with numbers and actual setting the length of an array1
		            	array1[k] = k+1;
		          	}

		          	for(var y = 0; y < lengthOfTheJsonFile; y ++)
		          	{	

			            var x = Math.floor(Math.random()*4+1);              //generating num 1-4 for radiobutt (right answer) 	   
			             
			            array2[x+w] = serverJsonData.questions[indexOfQuestions].q[1];      //putting the right answer into the array2 with index x+w
			            
			            a1 = serverJsonData.questions[indexOfQuestions].q[1];
			            
			            var num = Math.floor(Math.random() * array1.length);
			            
			            num1 = 0; num2 = 0; num3 = 0; num4 = 0;
			            
			            for(var l = 1; l < 5; l ++)
			            {

			                  if(x !== l)
			                  {
			                                 
			                    if(a1.localeCompare(serverJsonData.questions[num].q[1]) === 0)
			                    {
			                      while(a1.localeCompare(serverJsonData.questions[num].q[1]) === 0){
			                      	num = Math.floor(Math.random() * array1.length);
			                      }
			                        
			                      // while(num == 0)
			                      //   num = Math.floor(Math.random() * array1.length+1);
			                      
			                      //$('label[for=radio'+k+']').html(array.mix[num]);
			                      array2[l+w] = serverJsonData.questions[num].q[1];
			                      num = Math.floor(Math.random() * array1.length);
			                      while(a1.localeCompare(serverJsonData.questions[num].q[1]) === 0){
			                      	num = Math.floor(Math.random() * array1.length);
			                      }
			                        
			                    } //end of local compare.. 
			                    
			                    else
			                    {
			                      //$('label[for=radio'+k+']').html(array.mix[num]);
			                      array2[l+w] = serverJsonData.questions[num].q[1];
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
			                      
			                      while(num1===num || num2===num || num3===num || num4===num)
			                      {
			                        num = Math.floor(Math.random() * array1.length);
			                        
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
					
				}, function(msg) {
					debug(msg);
				});
			}
			else{
				
				var a1, w = 0;
		        	var array1 = [];
		        	var array2 = []; 
					
					View().viewPics(jsonData, indexOfQuestions);
					
		          
		          	for(var k = 0; k < lengthOfTheJsonFile; k++){ //filling the array with numbers and actual setting the length of an array1
		            	array1[k] = k+1;
		          	}

		          	for(var y = 0; y < lengthOfTheJsonFile; y ++)
		          	{	

		            var x = Math.floor(Math.random()*4+1);              //generating num 1-4 for radiobutt (right answer) 
		            // if(x==0)
		            //   console.log('ERROR X == 0');
		             
		            array2[x+w] = jsonData.questions[indexOfQuestions].q[1];      //putting the right answer into the array2 with index x+w
		            
		            a1 = jsonData.questions[indexOfQuestions].q[1];
		            
		            var num = Math.floor(Math.random() * array1.length);
		            
		            num1 = 0; num2 = 0; num3 = 0; num4 = 0;
		            
		            for(var l = 1; l < 5; l ++)
		            {

		                  if(x !== l)
		                  {
		                                 
		                    if(a1.localeCompare(jsonData.questions[num].q[1]) === 0)
		                    {
		                      while(a1.localeCompare(jsonData.questions[num].q[1]) === 0){
		                      	num = Math.floor(Math.random() * array1.length);
		                      }	                       
		                    
		                      array2[l+w] = jsonData.questions[num].q[1];
		                      num = Math.floor(Math.random() * array1.length);
		                      while(a1.localeCompare(jsonData.questions[num].q[1]) === 0){
		                      	num = Math.floor(Math.random() * array1.length);
		                      }
		                        
		                    } //end of local compare.. 
		                    
		                    else
		                    {
		                      //$('label[for=radio'+k+']').html(array.mix[num]);
		                      array2[l+w] = jsonData.questions[num].q[1];
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
		                      
		                      while(num1===num || num2===num || num3===num || num4===num)
		                      {
		                        num = Math.floor(Math.random() * array1.length);
		                        
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
			} //end of else (jsonData != null)

			
		} //end of getAppData
		
	};
	
	/* end of public methods */
	
	
	/* private methods */
    
	/* end of private methods */
	
	
    return interFace;
}(ModularMVC.View('view'), ModularMVC.Model('model'), ModularMVC.Helper('helper.serverapi'))); 