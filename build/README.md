### Geography widget

By Ondrej Blazek and Cecilia Ritzén

### Description ()

The geography widget is a geography quiz that examines knowledge of the European countries. The target group is primary school students. The quiz should provide a good way to check basic geography skills fast and entertaining.

The user is for every question provided with a picture of the country and where it is headed on the European map. The multiple choice answers are randomly given for every question. When all questions are gone through the user gets the opportunity to see the results of every answered questions together with how long it took to complete the quiz.
### Screenshots ()

### Used APIs ()

### Used libs ()

### Dependencies ()

The widget has got three packages installed via Bower:
- ModularMVC
- jquery
- jquery-mobile-bower

### Structure of modules ()
This widget is implemented using ModularMVC framework. This means that the following modules are implemented as support for the framework:
- Controller. The logic layer that controls what is happening in the widget.
- Model. The data layer for application data.
- View. The presentation layer that deals with the HTML. Only communicated with the controller about event handlings in the widget.
- Helper for language module and widget module.

Widget specific modules:
- Language module
- Widget module
