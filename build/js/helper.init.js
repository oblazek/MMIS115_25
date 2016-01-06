/**
 * Helper Module init
 *
 * @module helper-init
 * @author Ondrej Blazek <oblazek@student.tugraz.at>
 * @author Cecilia Ritzén <critzen@student.tugraz.at>
 * @requires Widget
 * @requires Language
 *
 * @version 1.0.0
 * @license Apache-2.0
 */
ModularMVC.registerHelper('helper.init', function (Widget, LanguageModule) {
	/* public methods */
	var interFace = {
		/**
		 * onWidgetReady is triggered by the framework automatically as soon as the Widget is ready.
		 * The language module is initialized and localisation strings are set
		 *	
		 * @public
		 * @memberOf module:helper-init
		 */
		onWidgetReady: function(){
			
			var lang = Widget().getPreference('lang');
			
			LanguageModule().properties({
				usefile: false,
				language: lang,
				translations: {
					en: {
						"START_BUTTON": 'START',
						"BACK": 'Back',
						"NEXT": 'Next',
						"QUIZ": "The Geography Quiz",
						"RESULTS": "Results",
						"RESULT": "Result!",
						"WELCOME": "Welcome to the Geography Quiz. This application tests your European country skills. Press Start to begin the journey!",
						"LANG": "Deutsch",
						"TIME": "Your time: ",
						"RIGHT_ANSWER": "Correct answer #<br>",
						"WRONG_ANSWER": "Incorrect answer #<br>",
						"CONGRATZ": "Congratulations! You made it through the quiz. Your result is: "
						// "AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN": "An error occurred. Please try again!",
						// "AN_UNEXPECTED_ERROR_OCCURRED.": "An unexpected error occured."
					},
					de: {
						"START_BUTTON": 'Anfang',
						"BACK": 'Zurück',
						"NEXT": "Nächsten",
						"QUIZ": "Die Geographie-Quiz",
						"RESULTS": "Ergebnisse",
						"RESULT": "Ergebnis!",
						"WELCOME": "Willkommen in der Geographie-Quiz. Diese Anwendung testet Ihre Fähigkeiten europäischen Land. Drücken Sie auf Start, um die Reise zu beginnen!",
						"LANG": "English",
						"TIME": "Ihr Zeit: ",
						"RIGHT_ANSWER": "Korrekte Antwort #<br>",
						"WRONG_ANSWER": "Falsche Antwort #<br>",
						"CONGRATZ": "Herzliche Glückwünsche! Sie machten es durch das Quiz. Ihr Ergebnis: "
						// "AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN": "Ein Fehler ist aufgetreten. Versuche es erneut!",
						// "AN_UNEXPECTED_ERROR_OCCURRED.": 'Ein unerwarteter Fehler ist aufgetreten.'
					}
				}
			});
		}
		
		/* end of public methods */
	};
	
	/* private methods */
	
	/* end of private methods */
	
	return interFace;
}(ModularMVC.MVCHelper('Widget'), ModularMVC.MVCHelper('Language')));