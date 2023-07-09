
//Student Number:22076842
//INST0019 Introduction to Programming and Scripting
//The lecturer's name: Dr Oliver Duke-Williams
//Coursework 2

// Works with a fixed number (4) of teams
const REQ_TEAMS = 4;

// an array for all the teams
var teams = new Array();

// an array for all the games
var games = new Array();

// an array for all the results
var results = new Array();

// constructor function for individual Team object
function Team(teamName) {
    this.name = teamName;
    this.points = 0;

	this.goal_scored=0;
	this.goal_conceded=0;
	this.goal_difference=0;
    this.strength="";
}

// Game object constructor
function Game() {
    this.homeTeam = "";
    this.awayTeam = "";
}

// Result object constructor
function Result() {
    this.homeGoals = 0;
    this.awayGoals = 0;
}

// add a new team
function addTeam() {

    //set the rule of input 
	var nameRule = /[a-zA-Z]/

	var outputText = "";

	// read form elements
	var nameInput = document.getElementById("teamName"); 
	var name = nameInput.value; // freetext

	//check if input match requirement

	if(!name.trim()){
		alert('please input')
		return
	}
	
	if(!nameRule.test(name)){
		alert('Your input does not match the requirement, please try another one')
		//clear the box 
		nameInput.value = ''
		return
	}

	var teamNum = teams.length;
	if(teamNum >= REQ_TEAMS){
		alert('cannot input more than'+ REQ_TEAMS +' teams')
		nameInput.value = ''
		return
	}

	// create a new 'team' object; these are internally numbered 0,1,... etc
	var teamNum = teams.length;
	teams[teamNum] = new Team(name);
	console.log(teams)
	//console.log(teamNum)
    
    //read the value of teamStrength and add them in teams
    var teamStrength= document.getElementById('teamStrength')?.value ?? 'xxxx'; //This is added to guarantee this js can also run in original(provided) html 
    teams[teamNum].strength=teamStrength;


	outputText = "<p>Added team number " + String((teamNum+1)) + ": " + name + "("+teamStrength+")"+"</p>";
	console.log(teamStrength)
    console.log(teams)  
	// update status
	var status = document.getElementById("outputDiv");
	status.innerHTML = outputText;
	
	// reset form
	nameInput.value="";

	return;
}


// function to create fixtures
function createFixtures() {
	games=[]
	for(var i=0; i<teams.length-1;i++){


		for(j=i+1;j<teams.length;j++){
			var gameNum=games.length;
			games[gameNum]=new Game() 
			console.log(games)

			//use Math.random()to choose which is homeTeam and which is awayTeam 
			if (Math.random()>0.5) {
				games[gameNum].homeTeam=i;
				games[gameNum].awayTeam=j;
			}
			else{
				games[gameNum].homeTeam=j;
				games[gameNum].awayTeam=i;
			}
		}
	}

	outputText ="<p>Fixtures hava been created " + "</p>";

	// update status
	var status = document.getElementById("outputDiv");
	status.innerHTML = outputText;
	return;
	
}

// function to list fixtures
function listFixtures() {
    var gameNum=games.length;
    if (gameNum==0){ 
		output = "<p>There are no games to list!</p>";
	} else {
// start table 
output = "<table id=listFixtures>";

// header
output += "<thead><tr><th>Game</th></tr></thead>";

// body
output += "<tbody>";
for (var i=0;i < gameNum;i++) {
	output += "<tr>";
	
	output += "<td>" + teams[games[i].homeTeam].name+' vs '+teams[games[i].awayTeam].name+ "</td>";
	output += "</tr>"; 
}
output += "</tbody>";
output += "</table>";


}
document.getElementById("outputDiv").innerHTML = output;

	return;
}


// function to list results
function listResults() {

	var resultNum = results.length;
	if (resultNum == 0) {
		output = "<p>There are no results to list!</p>";
	} else {

		// start table
		output = "<table id=listResults>";

		// header
		output += "<thead><tr><th>Result</th></tr></thead>";

		// body
		output += "<tbody>";
		for (var i=0;i < resultNum;i++) {
			output += "<tr>";
			output += "<td>" + teams[homeTeam].name + " " + results[i].homeGoals+" : "+ results[i].awayGoals+ " " +teams[awayTeam].name + "</td>";
			output += "</tr>";
		}
		output += "</tbody>";
		output += "</table>";


	}

	document.getElementById("outputDiv").innerHTML = output;
	return;

	
}

// list all teams
function listTeams() {

	// ADD CODE HERE
	// LIST ALL THE TEAM NAMES THAT HAVE BEEN ADDED

	var teamNum = teams.length;
	if (teamNum == 0) {
		output = "<p>There are no teams to list!</p>";
	} else {

		// start table
		output = "<table id=listTeams>";

		// header
		output += "<thead><tr><th>Team</th></tr></thead>";

		// body
		output += "<tbody>";
		for (var i=0;i < teamNum;i++) {
			output += "<tr>";
			output += "<td>" + teams[i].name + "</td>";
			output += "</tr>";
		}
		output += "</tbody>";
		output += "</table>";


	}

	document.getElementById("outputDiv").innerHTML = output;
	return;
}

// play games

function playNextGame() {

	var outputText = "";

	var nextGame = results.length;

	if (nextGame == games.length) {
		outputText = "<p>All games have been played!</p>";

	} else { 
		homeTeam = games[nextGame].homeTeam; // team number rather than name
		awayTeam = games[nextGame].awayTeam;

	// Different values are assigned depending on the difference in strength between the two teams.
    //A level teams(corresponds to number 3)are those strongest teams, B(corresponds to 2)are those second strongest teams，C(corresponds to 1)are those weakest teams
    // For every level difference between the two teams, the team with the higher level will have an extra chance to add 0-2 goals
    var teamstrengthGap = Number(teams[homeTeam].strength)-Number(teams[awayTeam].strength)
    
    gap= isNaN(teamstrengthGap) ? 0 : teamstrengthGap ;//guarantee this js can also run in original(given) html 
    
        if(gap>=0){
            homeGoals=Math.floor(Math.random()*3+gap*(Math.random()*3));
            awayGoals=Math.floor(Math.random()*3);
        }
        if(gap<0){
            homeGoals=Math.floor(Math.random()*3);
            awayGoals=Math.floor(Math.random()*3-gap*(Math.random()*3));
        }
		

		//add goals,losts and goal_difference records to teams 
		teams[homeTeam].goal_scored+=homeGoals;
		teams[homeTeam].goal_conceded+=awayGoals;
		teams[homeTeam].goal_difference+=(homeGoals-awayGoals)
        
	
		teams[awayTeam].goal_scored+=awayGoals;
		teams[awayTeam].goal_conceded+=homeGoals;
		teams[awayTeam].goal_difference+=(awayGoals-homeGoals)


		// add a new result object
		results[nextGame] = new Result;

        results[nextGame].homeGoals=homeGoals;
        results[nextGame].awayGoals=awayGoals;
        if(homeGoals==awayGoals){
        teams[homeTeam].points+=1;
        teams[awayTeam].points+=1;

    }else if(homeGoals>awayGoals){
        teams[homeTeam].points+=3;
    }else{
        teams[awayTeam].points+=3;
    }
    outputText = '<p>result of the game: '+teams[homeTeam].name+' '+homeGoals +' vs ' +awayGoals+' '+teams[awayTeam].name+'</p>';
        }
        console.log(results)
        var status = document.getElementById("outputDiv");
        status.innerHTML = outputText;
        return;
}

// function to show the league table
function showTable() {

	var outputText = "";
	var teamsCopy = teams.slice();

	// this sorts in descending number of points (b-a)
    //if level on points then we go to 'b.goal_scored-a.goal_scored' which sorts in descending number of goal_scored (b-a)
    //if level on goal_scored then we go to 'b.goal_difference-a.goal_difference' which sorts in descending number of goal_difference (b-a)
	// if level on goal_difference then we go to 'a.name > b.name' which sorts in ascending order of name
	
	teamsCopy.sort((a, b) => {
		return b.points - a.points || b.goal_scored-a.goal_scored || b.goal_difference-a.goal_difference || a.name > b.name;
	});


// start table
output = "<table id=listTable>";

// header
output += "<thead><tr><th>League Table</th></tr></thead>";

// body
output += "<tbody>";
output +="<tr>";
output +="<th>Team</th>";
output +="<th>Point</th>";
output +="<th>Goal_scored</th>";
output +="<th>Goal_conceded</th>";
output +="<th>Goal_difference</th>";
output +="</tr>";
output +="<tr>";
for(var i=0;i<teamsCopy.length;i++){
	output += "<tr>";
	output += "<td>" + teamsCopy[i].name + "</td><td>"+teamsCopy[i].points + "</td><td>" + teamsCopy[i].goal_scored+ "</td>"
	output += "<td>" + teamsCopy[i].goal_conceded + "</td><td>" + teamsCopy[i].goal_difference + "</td>";
	output += "</tr>";
}
output +="</tr>";
output += "</tbody>";
output += "</table>";

    
document.getElementById("outputDiv").innerHTML = output;
return;
}
