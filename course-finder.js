function getInput(){
	
	// Gets the users input and separates it based on commas
	var userInput = document.getElementById('input').value;
	var userInputClean = userInput.toUpperCase().split(',');

	// Removes excess white space and makes all letters uppercase
	for (x = 0; x < userInputClean.length; x++){
		userInputClean[x] = userInputClean[x].trim();
		userInputClean[x] = userInputClean[x].toUpperCase();
	}

	return userInputClean;
}

function getCourses(){

	// Empties the out put area and displays the loading spinner
	document.getElementById('testing2').innerHTML = '';
	createSpinner();

	// Reads the course.json file
	$.getJSON('https://raw.githubusercontent.com/Frank-K/course-finder/master/courses.json', function(data) {

		var user = getInput();
		var newText = findPrereqs(user, data);

	});
}

function findPrereqs(userCourses, courseData){

	var possibleCourses = [];
	var possibleText = "<b>Possible courses:</b><br>";

	// Loops through every course in the json file
	for (i = 0; i < courseData.length; i++){

		// cur includes the H1 or Y1 at the end, cur2 is just the 6 character code
		var cur = courseData[i].code.slice(0,8);
		var cur2 = courseData[i].code.slice(0,6);

		// Weeds out the courses that are not UTSG and courses that the user has said they already have taken
		if ((courseData[i].campus == "UTSG") && (userCourses.indexOf(cur2) == -1)){

			// Loops through every course the user inputted
			for (p = 0; p < userCourses.length; p++){

				// Makes sure the course has not already been added and that the user has one of the prereq's
				if ((possibleCourses.indexOf(cur) == -1) && (courseData[i].prerequisites.indexOf(userCourses[p]) != -1) && (userCourses[p] != '')){
					// Output text is built
					possibleText = possibleText.concat(buildText(cur, courseData[i]));

					possibleCourses.push(cur);
				}
			}
		}
	}

	// Output text is displayed
	document.getElementById('testing2').innerHTML = possibleText;

	return possibleText;
}

function buildText(courseCode, courseDict){
	// Builds the output text with the proper formatting

	var newText = "";

	linkCode = courseCode.slice(0,3).toLowerCase();

	var textLink = "http://calendar.artsci.utoronto.ca/crs_"+ linkCode +".htm#" + courseCode;

	newText = newText.concat('<span class="hint--top" aria-label="Click me to go to the course calendar"><font size="6"><b><a href=' + textLink + ' target="_blank" class="important">' + courseCode + '</a></b></font></span>');
	newText = newText.concat('<br>');
	newText = newText.concat('<font size="5">' + courseDict.name + '</font>');
	newText = newText.concat('<br>');
	newText = newText.concat(courseDict.description);
	newText = newText.concat('<br>');
	newText = newText.concat('<b> Prerequisites: </b>' + courseDict.prerequisites);
	newText = newText.concat('<br>');
	newText = newText.concat('<b> Exclusions: </b>' + courseDict.exclusions);
	newText = newText.concat('<br><br>');


	return newText;

}

function createSpinner(){
	// Creates the loading spinner that will show while the json file is being parsed

	var opts = {
		  lines: 13 // The number of lines to draw
		, length: 28 // The length of each line
		, width: 14 // The line thickness
		, radius: 42 // The radius of the inner circle
		, scale: 0.25 // Scales overall size of the spinner
		, corners: 1 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0.35 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 1 // Rounds per second
		, trail: 60 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '70%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: false // Whether to render a shadow
		, hwaccel: false // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('testing2')
	var spinner = new Spinner(opts).spin(target);
}
