//var userInputClean;

function getInput(){
	
	var userInput = document.getElementById('input').value;
	var userInputClean = userInput.toUpperCase().split(',');

	//userInputClean = userInput.toUpperCase().split(',');

	//$("#testing").text(userInputClean[0]);

	for (x = 0; x < userInputClean.length; x++){
		userInputClean[x] = userInputClean[x].trim();
		userInputClean[x] = userInputClean[x].toUpperCase();
	}

	//$("#testing").text(userInputClean[0]);
	return userInputClean;
}

function getCourses(){
	$("#output").text('aaaaaaaaaa');

	$.getJSON('https://raw.githubusercontent.com/Frank-K/course-finder/master/courses.json', function(data) {
		document.getElementById('outputText').value = data[0].id;

		var user = getInput();
		var newText = findPrereqs(user, data);

		//document.getElementById('testing2').innerHTML = newText;
		document.getElementById('testing').innerHTML = "EVERYTHING HAS ENDED";
		
/*		var elegibleCourses = "You can take: ";
		var seen = [];

		for (num = 0; num < data.length; num++){
			//if (console.log(data[num].id.indexOf(user[0]) > -1)){

			var cur = data[num].code.slice(0,6);

			if (seen.indexOf(cur) == -1) {

				if (data[num].code.indexOf(user[0]) > -1){
					var course = data[num].code;

					elegibleCourses = elegibleCourses.concat(course);
					elegibleCourses = elegibleCourses.concat(", ");

					seen.push(cur);

					//document.getElementById('outputText').innerHTML = elegibleCourses;
				}
			}
		}

		document.getElementById('testing2').innerHTML = elegibleCourses;
		document.getElementById('testing').innerHTML = "THE LOOP HAS ENDED";
		//document.getElementById('outputText').value = elegibleCourses;
*/

	});

	//document.getElementById('testing2').innerHTML = "YOU PRESSED THE BUTTON!<br>Hello";

/*	$("#output").text('aaaaaaaaaa');

	var stuff = getInput();
	$("#testing").text(stuff[0]);

	document.getElementById('testing2').innerHTML = "YOU PRESSED THE BUTTON!<br>Hello";
*/

}

function findPrereqs(userCourses, courseData){

	var possibleCourses = [];
	var possibleText = "<b>You can take:</b><br>";

	document.getElementById('outputText').value = courseData[10].id + courseData[10].prerequisites;

	if (courseData[10].prerequisites.indexOf("ABS201") > -1 && possibleCourses.indexOf("ABS201") == -1 && courseData[10]){
		document.getElementById('outputText').value = courseData[10].prerequisites;
	}

	// Loops through every course in the json file
	for (i = 0; i < courseData.length; i++){
		document.getElementById('testing3').innerHTML = i;

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
	buildText();


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