function getInput(){
	
	var userInput = document.getElementById('input').value;
	var userInputClean = userInput.toUpperCase().split(',');

	for (x = 0; x < userInputClean.length; x++){
		userInputClean[x] = userInputClean[x].trim();
		userInputClean[x] = userInputClean[x].toUpperCase();
	}

	return userInputClean;
}

function getCourses(){

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
				if ((possibleCourses.indexOf(cur) == -1) && (courseData[i].prerequisites.indexOf(userCourses[p]) != -1)){
					//possibleText = possibleText.concat(cur);
					//possibleText = possibleText.concat("<br>");
					possibleText = possibleText.concat(buildText(cur, courseData[i]));

					possibleCourses.push(cur);
				}
			}
		}
	}


	document.getElementById('testing2').innerHTML = possibleText;

	return possibleText;
}

function buildText(courseCode, courseDict){
	var newText = "";

	linkCode = courseCode.slice(0,3).toLowerCase();

	var textLink = "http://calendar.artsci.utoronto.ca/crs_"+ linkCode +".htm#" + courseCode;

	newText = newText.concat('<font size="6"><b><a href=' + textLink + ' target="_blank" class="important">' + courseCode + '</a></b></font>');
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