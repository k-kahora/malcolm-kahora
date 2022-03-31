

var selectNewData = function() {



}

var colors = [];

var formatHash = function(param, value) {



	var final = [];

	for (let i = 0; i < param.length; ++i) {
		for (let j = 0; j < param[i][1].length; ++j) {
			var obj = {

				Team: param[i][0],
				Sum: param[i][1][j][1][value]
			}


			for (let i = 0; i < dataset.length; ++i) { }

			dates[param[i][1][j][0].slice(4)][param[i][0]] = param[i][1][j][1][value];




		}

	}

	finalDates = Object.entries(dates);

	miniStack.keys(miniStackKeys);

	stack.keys(stackKeys).value(function value(d, key) {


		if (!(key in d[1])) return 0;


		return d[1][key];


	});


	//    console.log(finalDates);

	series = stack(finalDates);




	xScale = d3.scaleTime()
		.domain([d3.min(dataset, function(d) { return d.yearID }), d3.max(dataset, function(d) {
			return d.yearID
		})])
		.range([padding, w - padding]);

	yScale = d3.scaleLinear()
		.domain([0, d3.max(finalDates, function(d) {



			return d3.sum(Object.values(d[1]));
		})


		])
		.range([h - padding, padding]);

	xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10)
		.tickFormat(formatTime);


	yAxis = d3.axisRight()
		.scale(yScale)
		.ticks(10)


	area = d3.area()
		.x(function(d) { return xScale(parseTime(d.data[0])) })
		.y0(function(d) { return yScale(d[0]) })
		.y1(function(d) { return yScale(d[1]) });



}







var w = 1000, h = 500;

var testScale;

var padding = 40;

var dataset, xAxis, yAxis, xScale, yScale, area, series, miniStackKeys, stackKeys;

var selectedValue = "SF";

// Makes the date a Date object
var parseTime = d3.timeParse("%Y");

var formatTime = d3.timeFormat("%Y");

var stack = d3.stack()
	.order(d3.stackOrderdescending);

var miniStack = d3.stack()
	.order(d3.stackOrderAscending);

var globalData;





var rowConverter = function(data) {

	return {

		playerID: data.playerID,
		yearID: parseTime(data.yearID),
		teamID: data.teamID,
		AB: parseInt(data.AB),
		R: parseInt(data.R),
		G: parseInt(data.G),
		R: parseInt(data.R),
		H: parseInt(data.H),
		twoB: parseInt(data.twoB),
		threeB: parseInt(data.threeB),
		HR: parseInt(data.HR),
		RBI: parseInt(data.RBI),
		SB: parseInt(data.SB),
		CS: parseInt(data.CS),
		BB: parseInt(data.BB),
		SO: parseInt(data.SO),
		IBB: parseInt(data.IBB),
		HBP: parseInt(data.HBP),
		SH: parseInt(data.SH),
		SF: parseInt(data.SF),
		GIDP: parseInt(data.GIDP)

	}
};

var types = [];

var dates = {}, finalDates = [];

d3.csv("batting.csv", rowConverter, function(error, data, index) {

	/* indexes of types */

	// for (var i = 5; i < data[0].length - 4; ++i) {

	// 	types[i - 5] = data[0]

	// }

	types = Object.entries(data[0]);



	for (var i = 3; i < types.length; ++i) {

		types[i - 3] = types[i][0];

	}

	dataset = data;

	var hash = {};



	var trueData = [];


	for (let i = 1; i < dataset.length; ++i) {


		hash[dataset[i].teamID] = {};
		dates[formatTime(dataset[i].yearID)] = {};


	}




	for (let i = 0; i < dataset.length; ++i) {


		Object.defineProperty(hash[dataset[i].teamID], "Date" + formatTime(dataset[i].yearID), {

			value: {},
			configurable: true,
			enumerable: true


		});

	}


	for (let i = 0; i < dataset.length; ++i) {


		Object.defineProperty(hash[dataset[i].teamID]["Date" + formatTime(dataset[i].yearID)], dataset[i].playerID, {

			value: dataset[i],
			configurable: true,
			enumerable: true


		});

	}



	stackKeys = Object.keys(hash);
	miniStackKeys = Object.keys(hash);

	var teams = (Object.entries(hash));



	types = types.slice(0, types.length - 3);

	// console.log(types);


	for (let i = 0; i < teams.length; ++i) {

		// gives all the dates for every team
		var keys = Object.keys(teams[i][1])

		for (let j = 0; j < keys.length; ++j) {

			for (let k = 0; k < types.length; ++k) {

				var value = types[k];

				//                   the teams dates  
				var sum1 = d3.sum(Object.values(teams[i][1][keys[j]]), function(d) {

					return d[value];


				});

				//	    adds a key to the data with the sum of all the current values for that year
				teams[i][1][keys[j]][value] = sum1;
			}

		}


	}


	for (let i = 0; i < teams.length; ++i) {

		//	converts the date object to an array

		teams[i][1] = Object.entries(teams[i][1]);
		/*
			  
		  for (let j = 0; j < teams[i][1].length; ++j) {
	
		  teams[i][1][j][1] = Object.entries(teams[i][1][j][1])
			  
		  }*/

	}


	formatHash(teams, selectedValue);

	// console.log(teams)    



    var parseStats = function (param) {

	

	switch (param) {
	    
	case ("AB"): return "At Bats";
	case ("R"): return "Runs";
	case ("G"): return "";
	case ("H"): return ;
	case ("twoB"): return "Doubles";
	case ("threeB"): return "Triples";
	case ("HR"): return "Home Runs";
	case ("RBI"): return "Runs Batted In";
	case ("SB"): return "Stolen Bases";
	case ("CS"): return "Caught Stealing";
	case ("BB"): return "Base on balls";
	case ("SO"): return "Shutout";
	case ("IBB"): return "Intentional base on balls";
	case ("HBP"): return "Hit By Pitch";
	case ("SH"): return "Sacrifice Hit";
	case ("SF"): return "Sacrifice Fly";
	case ("GIDP"): return "Grounded into double play";

	}
	
    }



	d3.select("div.dropdown div.dropdown-content")
		.selectAll("a")
		.data(types)
		.enter()
		.append("a")
	.text(function(d) {

	    return d;
	    

	});

    
    


	d3.select("div.dropdown div.dropdown-content").selectAll("a")
		.on("click", function(d) {

			formatHash(teams, d);

			svg.select("#allTeams")
				.selectAll("path")
				.data(series)
				.transition()
				.duration(3000)
				.attr("d", area);

			yScale.domain([0, d3.max(finalDates, function(d) {
				return d3.sum(Object.values(d[1]));

			})]).range([h - padding, padding]);

			d3.select("g.axis.y").transition()
				.duration(3000)
				.call(yAxis);

		});



	var svg = d3.select("body #chart-container")
		.append("svg")
		.attr("width", w)
		.attr("height", h);



	svg.append("g")
		.attr("id", "allTeams")
		.selectAll("path")
		.data(series)
		.enter()
		.append("path")
		.attr("class", "area")
		.attr("d", area)
		.attr("fill", function(d, i) {
			return d3.schemeCategory20c[i % 20];
		})


		.on("click", function(d) {

			var newDataSet = []


			var team = d.key

			var copyOfDates = [];

			for (let i = 0; i < finalDates.length; ++i) {

				copyOfDates[i] = {};

			}

			teamIds = {};

			

			teams.forEach((k) => {

				let key = k[0];
				let val = 0;

				teamIds[key] = val;

			})

			for (let i = 0; i < finalDates.length; ++i) {

				Object.keys(teamIds).forEach((g) => {

					copyOfDates[i][g] = 0;

					if (typeof finalDates[i][1][team] === 'undefined')
						copyOfDates[i][team] = 0;

					else
						copyOfDates[i][team] = finalDates[i][1][team];

					copyOfDates[i].date = parseTime(finalDates[i][0]);


				})

			}
			


			var miniSeries = miniStack(copyOfDates);
			/*		     
					 yScale.domain([0, d3.max(function(d) {
					 
					 return d.data[team];
					 
					 })])
					 .range([h - padding, padding]);
			*/




			//		     console.log(miniSeries);



			var newPaths = d3.selectAll("#allTeams path").data(miniSeries, function(d) { return d.key; })
			/*.data(miniSeries, function(d) {
			  
			  
			  
			  console.log(d);
			  
			  
			  return d.key});
			*/
			// store transition in a variable


			area2 = d3.area()

				.x(function(d) { return xScale(d.data.date) })
				.y0(function(d) { return yScale(d[0]) })
				.y1(function(d) { return yScale(d[1]) });

			var areaTransition = newPaths.transition()
			    
			    .duration(3000)

		    .delay(function(d, i) {

					return i * 25;

				})

				.attr("d", area2);


			var flag = 0;

			yScale.domain([0, d3.max(finalDates, function(d) {

				if (team in d[1]) {
					return d[1][team];


				}
				return 0;




			})]).range([h - padding, padding]);

			areaTransition.transition()
			.delay(2000)
			.duration(1500)
				.on("start", function() {

					d3.select("g.axis.y")
						.transition()
						.duration(1500)
						.call(yAxis) //update axis


				})
				
				.attr("d", area2);

		})
		.append("title")  //Make tooltip
		.text(function(d) {
			return parseTeamId(d.key);
		});

	svg.append("g")
		.attr("class", "axis x")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);




	svg.append("g")
		.attr("class", "axis y")
		.attr("transform", "translate(" + (w - padding) + "," + 0 + ")")
		.call(yAxis);


});

var parseTeamId = function(id) {

	switch (id) {



		case ("AB2"): return "Indianapolis ABCs";
		case ("ID"): return "Indianapolis ABCs/Detroit Stars";
		case ("ABC"): return "Indianapolis ABCs";
		case ("AG"): return "Akron Black Tyrites";
		case ("ALT"): return "Altoona Mountain City";
		case ("ANA"): return "Anaheim Angels";
		case ("CAL"): return "California Angels";
		case ("LAA"): return "Los Angeles Angels of Anaheim";
		case ("ARI"): return "Arizona Diamondbacks";
		case ("ATH"): return "Philadelphia Athletics";
		case ("ATL"): return "Atlanta Braves";
		case ("BSN"): return "Boston Braves";
		case ("MLN"): return "Milwaukee Braves";
		case ("AC"): return "Atlantic City Bacharach Giants";
		case ("BAL"): return "Baltimore Orioles";
		case ("MLA"): return "Milwaukee Brewers";
		case ("SLB"): return "St. Louis Browns";
		case ("BBB"): return "Birmingham Black Barons";
		case ("BBS"): return "Baltimore Black Sox";
		case ("BCA"): return "Atlanta Black Crackers";
		case ("IAB"): return "Indianapolis ABCs";
		case ("BEG"): return "Baltimore Elite Giants";
		case ("CEG"): return "Columbus Elite Giants";
		case ("NEG"): return "Nashville Elite Giants";
		case ("WEG"): return "Washington Elite Giants";
		case ("BUF"): return "Buffalo Bisons";
		case ("BUF"): return "Buffalo Buffeds";
		case ("BLA"): return "Baltimore Orioles";
		case ("BAL"): return "Baltimore Canaries";
		case ("BAL"): return "Baltimore Orioles";
		case ("BLN"): return "Baltimore Orioles";
		case ("BAL"): return "Baltimore Terrapins";
		case ("BLU"): return "Baltimore Monumentals";
		case ("BOS"): return "Boston Red Stockings";
		case ("BOS"): return "Boston Red Sox";
		case ("BRG"): return "Brooklyn Royal Giants";
		case ("BRA"): return "Brooklyn Atlantics";
		case ("BOS"): return "Boston Reds";
		case ("BRG"): return "Brooklyn Gladiators";
		case ("BOS"): return "Boston Reds";
		case ("BTT"): return "Brooklyn Tip-Tops";
		case ("BUF"): return "Buffalo Bisons";
		case ("BWW"): return "Brooklyn Ward's Wonders";
		case ("CAG"): return "Chicago American Giants";
		case ("CBB"): return "Columbus Blue Birds";
		case ("CBE"): return "Cleveland Buckeyes";
		case ("CCB"): return "Cincinnati/Cleveland Buckeyes";
		case ("COL"): return "Columbus Buckeyes";
		case ("CLV"): return "Cleveland Blues";
		case ("CBN"): return "Cleveland Browns";
		case ("CCU"): return "Cleveland Cubs";
		case ("CEL"): return "Cleveland Elites";
		case ("CEN"): return "Philadelphia Centennials";
		case ("CLE"): return "Cleveland Forest Citys";
		case ("CG"): return "Cleveland Giants";
		case ("CHC"): return "Chicago Cubs";
		case ("CHI"): return "Chicago Chi-Feds";
		case ("CHI"): return "Chicago Pirates";
		case ("CHT"): return "Cleveland Hornets";
		case ("CHW"): return "Chicago White Sox";
		case ("CIN"): return "Cincinnati Reds";
		case ("CKK"): return "Cincinnati Kelly's Killers";
		case ("CLS"): return "Cleveland Stars";
		case ("CLE"): return "Cleveland Indians";
		case ("CLE"): return "Cleveland Infants";
		case ("COL"): return "Columbus Solons";
		case ("CLE"): return "Cleveland Blues";
		case ("CLV"): return "Cleveland Spiders";
		case ("CHI"): return "Chicago White Stockings";
		case ("CIN"): return "Cincinnati Reds";
		case ("CIN"): return "Cincinnati Reds";
		case ("COB"): return "Columbus Buckeyes";
		case ("COG"): return "Chicago Giants";
		case ("COL"): return "Colorado Rockies";
		case ("COR"): return "Cincinnati Outlaw Reds";
		case ("COT"): return "Columbus Turf Club";
		case ("CPI"): return "Chicago/Pittsburgh";
		case ("CRS"): return "Cleveland Red Sox";
		case ("CSE"): return "Cuban Stars East";
		case ("CS"): return "Cincinnati Cuban Stars (West)";
		case ("CSW"): return "Cuban Stars West";
		case ("CT"): return "Cincinnati Tigers";
		case ("CTG"): return "Cleveland Tigers";
		case ("CTS"): return "Cleveland Tate Stars";
		case ("CUP"): return "Cuban Stars East";
		case ("DET"): return "Detroit Tigers";
		case ("DS"): return "Detroit Stars";
		case ("DTN"): return "Detroit Wolverines";
		case ("DTS"): return "Detroit Stars";
		case ("DW"): return "Detroit Wolves";
		case ("DM"): return "Dayton Marcos";
		case ("ECK"): return "Brooklyn Eckfords";
		case ("FLA"): return "Florida Marlins";
		case ("MIA"): return "Miami Marlins";
		case ("HAR"): return "Hartford Dark Blues";
		case ("HBG"): return "Harrisburg Giants";
		case ("HG"): return "Homestead Grays";
		case ("HIL"): return "Philadelphia Hilldale Giants";
		case ("HAR"): return "Hartford Dark Blues";
		case ("HOU"): return "Houston Astros";
		case ("IA"): return "Indianapolis Athletics";
		case ("IND"): return "Indianapolis Blues";
		case ("CC"): return "Cincinnati/Indianapolis Clowns";
		case ("IC"): return "Indianapolis Clowns";
		case ("IND"): return "Indianapolis Hoosiers";
		case ("IND"): return "Indianapolis Hoosiers";
		case ("CBR"): return "Cleveland Bears";
		case ("JRC"): return "Jacksonville Red Caps";
		case ("KCC"): return "Kansas City Cowboys";
		case ("KCM"): return "Kansas City Monarchs";
		case ("KCN"): return "Kansas City Cowboys";
		case ("KCP"): return "Kansas City Packers";
		case ("KCR"): return "Kansas City Royals";
		case ("KCC"): return "Kansas City Cowboys";
		case ("KEK"): return "Fort Wayne Kekiongas";
		case ("BRO"): return "Brooklyn Dodgers";
		case ("LAD"): return "Los Angeles Dodgers";
		case ("LOU"): return "Louisville Grays";
		case ("LOU"): return "Louisville Colonels";
		case ("LRG"): return "Little Rock Grays";
		case ("LOW"): return "Louisville White Sox";
		case ("LVB"): return "Louisville Black Caps";
		case ("MAN"): return "Middletown Mansfields";
		case ("MAR"): return "Baltimore Marylands";
		case ("MB"): return "Milwaukee Bears";
		case ("MGS"): return "Montgomery Grey Sox";
		case ("MIL"): return "Milwaukee Brewers";
		case ("SEP"): return "Seattle Pilots";
		case ("MIN"): return "Minnesota Twins";
		case ("WSH"): return "Washington Senators";
		case ("MIL"): return "Milwaukee Brewers";
		case ("MLG"): return "Milwaukee Grays";
		case ("MIL"): return "Milwaukee Brewers";
		case ("MRM"): return "Monroe Monarchs";
		case ("MRS"): return "Memphis Red Sox";
		case ("NAT"): return "Washington Nationals";
		case ("NBY"): return "New York Black Yankees";
		case ("ND"): return "Newark Dodgers";
		case ("BE"): return "Brooklyn Eagles";
		case ("NE"): return "Newark Eagles";
		case ("IND"): return "Indianapolis Hoosiers";
		case ("NEW"): return "Newark Pepper";
		case ("NHV"): return "New Haven Elm Citys";
		case ("NLG"): return "New York Lincoln Giants";
		case ("NYU"): return "New York Mutuals";
		case ("NS"): return "Newark Stars";
		case ("NWB"): return "Newark Browns";
		case ("NYC"): return "New York Cubans";
		case ("NYI"): return "New York Giants";
		case ("NYM"): return "New York Mets";
		case ("NYP"): return "New York Metropolitans";
		case ("NYU"): return "New York Mutuals";
		case ("NYY"): return "New York Yankees";
		case ("KCA"): return "Kansas City Athletics";
		case ("OAK"): return "Oakland Athletics";
		case ("PHA"): return "Philadelphia Athletics";
		case ("OLY"): return "Washington Olympics";
		case ("PBB"): return "Pittsburgh Burghers";
		case ("PBG"): return "Atlantic City Bacharach Giants";
		case ("PK"): return "Pittsburgh Keystones";
		case ("PBS"): return "Pittsburgh Rebels";
		case ("PC"): return "Pittsburgh Crawfords";
		case ("TC"): return "Toledo Crawfords";
		case ("TC2"): return "Toledo Crawfords";
		case ("PHA"): return "Philadelphia Athletics";
		case ("PHI"): return "Philadelphia Phillies";
		case ("PHK"): return "Philadelphia Keystones";
		case ("PHA"): return "Philadelphia Athletics";
		case ("PHQ"): return "Philadelphia Athletics";
		case ("PIT"): return "Pittsburgh Pirates";
		case ("ATH"): return "Philadelphia Athletics";
		case ("PRO"): return "Providence Grays";
		case ("PS"): return "Philadelphia Stars";
		case ("PTG"): return "Philadelphia Hilldale Giants";
		case ("PHI"): return "Philadelphia Whites";
		case ("RES"): return "Elizabeth Resolutes";
		case ("RIC"): return "Richmond Virginians";
		case ("ROC"): return "Rochester Broncos";
		case ("ROK"): return "Rockford Forest Citys";
		case ("STL"): return "St. Louis Brown Stockings";
		case ("SDP"): return "San Diego Padres";
		case ("SEA"): return "Seattle Mariners";
		case ("SEN"): return "Washington Black Senators";
		case ("NYG"): return "New York Giants";
		case ("SFG"): return "San Francisco Giants";
		case ("SL2"): return "St. Louis Stars";
		case ("SLM"): return "St. Louis Terriers";
		case ("SLM"): return "St. Louis Maroons";
		case ("SLR"): return "St. Louis Red Stockings";
		case ("SLG"): return "St. Louis Giants";
		case ("SLS"): return "St. Louis Stars";
		case ("STL"): return "St. Louis Brown Stockings";
		case ("AB3"): return "Indianapolis ABCs";
		case ("HAR"): return "Harrisburg Stars";
		case ("SL3"): return "St. Louis Stars";
		case ("SNS"): return "St. Louis/New Orleans Stars";
		case ("STL"): return "St. Louis Cardinals";
		case ("STP"): return "St. Paul White Caps";
		case ("SYR"): return "Syracuse Stars";
		case ("SYR"): return "Syracuse Stars";
		case ("TBD"): return "Tampa Bay Devil Rays";
		case ("TBR"): return "Tampa Bay Rays";
		case ("TEX"): return "Texas Rangers";
		case ("WSA"): return "Washington Senators";
		case ("TOL"): return "Toledo Maumees";
		case ("TOL"): return "Toledo Blue Stockings";
		case ("TOR"): return "Toronto Blue Jays";
		case ("TRO"): return "Troy Haymakers";
		case ("TRO"): return "Troy Trojans";
		case ("TT"): return "Toledo Tigers";
		case ("WAP"): return "Washington Pilots";
		case ("WAS"): return "Washington Statesmen";
		case ("WHS"): return "Washington Senators";
		case ("WAS"): return "Washington Blue Legs";
		case ("WES"): return "Keokuk Westerns";
		case ("WIL"): return "Wilmington Quicksteps";
		case ("WHS"): return "Washington Nationals";
		case ("WHS"): return "Washington Nationals";
		case ("WAS"): return "Washington Nationals";
		case ("WOR"): return "Worcester Ruby Legs";
		case ("WMP"): return "Wilmington Potomacs";
		case ("WP"): return "Washington Potomacs";
		case ("MON"): return "Montreal Expos";
		case ("WSN"): return "Washington Nationals";
		case ("WAS"): return "Washington Nationals";
		default:
			return id;
	}


}
