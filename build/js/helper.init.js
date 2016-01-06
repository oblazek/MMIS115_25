/**
 * Helper Module init
 *
 * @module helper-init
 * @author Ondrej Blazek, Cecilia Ritzen <oblazek@student.tugraz.at>, <critzen@student.tugraz.at>
 * @requires Widget
 * @requires Language
 *
 * @version 1.0.0
 * 
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
			debug("Helper.Init onWidgetReady: initialized the localization strings");
			
			var lang = Widget().getPreference('lang');
			
			debug("Helper.Init: set language preference: " + lang);
			//debug("Helper.Init: initialize the language module now");
			
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
						// "AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN": "An error occurred. Please try again!",
						"AN_UNEXPECTED_ERROR_OCCURRED.": "An unexpected error occured."
					},
					de: {
						"START_BUTTON": 'Anfang',
						"BACK": 'Zurück',
						"NEXT": "Nächsten",
						"QUIZ": "Die QUIZ",
						"RESULTS": "Ergebnisse",
						"RESULT": "Ergebnis!",
						"WELCOME": "Willkommen in der Geographie-Quiz. Diese Anwendung testet Ihre Fähigkeiten europäischen Land. Drücken Sie auf Start, um die Reise zu beginnen!",
						"LANG": "English",
						// "AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN": "Ein Fehler ist aufgetreten. Versuche es erneut!",
						"AN_UNEXPECTED_ERROR_OCCURRED.": 'Ein unerwarteter Fehler ist aufgetreten.'
					}
				}
			});
		}
		
		/* end of public methods */
	};
	
	/* private methods */
	
	/* end of private methods */
	
	//debug('Helper.Init loaded');
	return interFace;
}(ModularMVC.MVCHelper('Widget'), ModularMVC.MVCHelper('Language')));