// hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-ul');
const links = document.querySelectorAll('.nav-li');
const lines = document.querySelectorAll('.line');

hamburger.addEventListener('click', () => {
	navLinks.classList.toggle('open');
	hamburger.classList.toggle('rotate');
	links.forEach(links => {
		links.classList.toggle('fade');
	});
	lines.forEach(lines => {
		lines.classList.toggle('rotate');
	});
});

// creating var for today date, last week, last month etc
var todayDate = moment().format('YYYY-MM-DD');
var weekAgoDate = moment()
	.subtract(7, 'days')
	.format('YYYY-MM-DD');
var monthAgoDate = moment()
	.subtract(31, 'days')
	.format('YYYY-MM-DD');
var yearAgoDate = moment()
	.subtract(365, 'days')
	.format('YYYY-MM-DD');

// timeframe var for API calls
var lastWeek = weekAgoDate + ',' + todayDate; //es 2020-01-01,2020-01-08
var lastMonth = monthAgoDate + ',' + todayDate;
var lastYear = yearAgoDate + ',' + todayDate;
// for year 2016 - 2012 - 2008
var year2016 = '2016-01-01,2016-12-31';
var year2012 = '2012-01-01,2012-12-31';
var year2008 = '2008-01-01,2008-12-31';

// category var for API calls
var ratedCat = '&ordering=-rating';
var popCat = '&ordering=-added';

// assign var to nav-li (to add and remove class .active [border-bottom])
var liRated = document.getElementById('navLiRated');
var liPop = document.getElementById('navLiPop');
var liReleased = document.getElementById('navLiReleased');

// assign var to radio buttons
var topRatedWeek = document.getElementById('ratedWeekly');
var topRatedMonth = document.getElementById('ratedMonthly');
var topRatedYear = document.getElementById('ratedYearly');

var topPopWeek = document.getElementById('popWeekly');
var topPopMonth = document.getElementById('popMonthly');
var topPopYear = document.getElementById('popYearly');

var best2016 = document.getElementById('best2016');
var best2012 = document.getElementById('best2012');
var best2008 = document.getElementById('best2008');

// assign var to DOM elements
var spanTimeframe = document.getElementById('span-timeframe');
var spanCategory = document.getElementById('span-category');

// variables for callAPI()
var ulTop = document.getElementById('top5ul');

// change span category and add class active to nav-li
function activeCategory() {
	if (topRatedWeek.checked || topRatedMonth.checked || topRatedYear.checked) {
		sorting = ratedCat;

		spanCategory.innerHTML = 'Top 5 rated videogames';
		liRated.classList.add('active');
		liPop.classList.remove('active');
		liReleased.classList.remove('active');
	} else if (topPopWeek.checked || topPopMonth.checked || topPopYear.checked) {
		sorting = popCat;

		spanCategory.innerHTML = 'Top 5 popular videogames';
		liRated.classList.remove('active');
		liPop.classList.add('active');
		liReleased.classList.remove('active');
	} else if (best2016.checked || best2012.checked || best2008.checked) {
		sorting = popCat;

		spanCategory.innerHTML = 'Best 5 videogames in';
		liRated.classList.remove('active');
		liPop.classList.remove('active');
		liReleased.classList.add('active');
	}
}

// executing function so js recognizes topRatedWeek RADIO is checked by default
activeCategory();

// change span DOM timeframe
function activeTimeframe() {
	if (topRatedWeek.checked || topPopWeek.checked) {
		timeframe = lastWeek;

		spanTimeframe.innerHTML = 'last week';
	} else if (topRatedMonth.checked || topPopMonth.checked) {
		timeframe = lastMonth;

		spanTimeframe.innerHTML = 'last month';
	} else if (topRatedYear.checked || topPopYear.checked) {
		timeframe = lastYear;

		spanTimeframe.innerHTML = 'last year';
	} else if (best2016.checked) {
		timeframe = year2016;

		spanTimeframe.innerHTML = 'in 2016';
	} else if (best2012.checked) {
		timeframe = year2012;

		spanTimeframe.innerHTML = 'in 2012';
	} else if (best2008.checked) {
		timeframe = year2008;

		spanTimeframe.innerHTML = 'in 2008';
	}
}
// executing function so js recognizes topRatedWeek RADIO is checked by default
activeTimeframe();

//interrogate API
var apiData = 'https://api.rawg.io/api/games?dates=';

function callAPI() {
	var apiUrl = `${apiData}${timeframe}${sorting}`;
	fetch(apiUrl)
		.then(data => data.json())
		.then(results => generateTop5(results));
}

callAPI();

// Here code is repeated several times because it was the only way I found to "overwrite" DOM elements each time
// game gets clicked to display img etc [var x changes value]

const generateTop5 = data => {
	var gameName = document.getElementById('h2Image');
	var gamePic = document.getElementById('top5Img');
	var gamePlats = document.getElementById('platforms');

	for (var i = 0; i <= 4; i++) {
		liTop = document.getElementsByClassName('top5-li');

		liTop[i].innerHTML = data.results[i].name;
	}
	x = 0;

	gamePic.src = data.results[x].background_image;
	gameName.innerHTML = data.results[x].name;
	gamePlats = document.getElementById('platforms');

	platformsList = data.results[x].platforms;
	var platsList = ''; // each time emptying variable so old game platforms are deleted

	// iterate platforms array to display each available platform
	for (plat of platformsList) {
		platsList += plat.platform.name + '\xa0' + '\xa0' + '\xa0';
		gamePlats.innerHTML = platsList;
	}

	var firstLi = document.getElementById('topLi1');
	firstLi.addEventListener('click', function() {
		x = 0;

		gamePic.src = data.results[x].background_image;
		gameName.innerHTML = data.results[x].name;
		platformsList = data.results[x].platforms;

		platsList = '';

		// iterate platforms array to display each available platform
		for (plat of platformsList) {
			platsList += plat.platform.name + '\xa0' + '\xa0' + '\xa0';
			gamePlats.innerHTML = platsList;
		}
	});

	var secondLi = document.getElementById('topLi2');
	secondLi.addEventListener('click', function() {
		x = 1;

		gamePic.src = data.results[x].background_image;
		gameName.innerHTML = data.results[x].name;
		platformsList = data.results[x].platforms;

		platsList = '';

		// iterate platforms array to display each available platform
		for (plat of platformsList) {
			platsList += plat.platform.name + '\xa0' + '\xa0' + '\xa0';
			gamePlats.innerHTML = platsList;
		}
	});

	var thirdLi = document.getElementById('topLi3');
	thirdLi.addEventListener('click', function() {
		x = 2;

		gamePic.src = data.results[x].background_image;
		gameName.innerHTML = data.results[x].name;
		platformsList = data.results[x].platforms;

		platsList = '';

		// iterate platforms array to display each available platform
		for (plat of platformsList) {
			platsList += plat.platform.name + '\xa0' + '\xa0' + '\xa0';
			gamePlats.innerHTML = platsList;
		}
	});

	var fourthLi = document.getElementById('topLi4');
	fourthLi.addEventListener('click', function() {
		x = 3;

		gamePic.src = data.results[x].background_image;
		gameName.innerHTML = data.results[x].name;
		platformsList = data.results[x].platforms;

		platsList = '';

		// iterate platforms array to display each available platform
		for (plat of platformsList) {
			platsList += plat.platform.name + '\xa0' + '\xa0' + '\xa0';
			gamePlats.innerHTML = platsList;
		}
	});

	var fifthLi = document.getElementById('topLi5');
	fifthLi.addEventListener('click', function() {
		x = 4;

		gamePic.src = data.results[x].background_image;
		gameName.innerHTML = data.results[x].name;
		platformsList = data.results[x].platforms;

		platsList = '';

		// iterate platforms array to display each available platform
		for (plat of platformsList) {
			platsList += plat.platform.name + '\xa0' + '\xa0' + '\xa0';
			gamePlats.innerHTML = platsList;
		}
	});
};

// merging functions for onChange event radio buttons
function handleChange() {
	activeCategory();
	activeTimeframe();
	callAPI();
}

/* USED ANOTHER WAY IN THE END BUT KEEPING FOR FUTURE REFERENCE
function callAPI() {
	$.getJSON(
		'https://api.rawg.io/api/games?dates=' + timeframe + sorting,
		function(data) {
			for (var i = 0; i <= 4; i++) {
				liTop = document.getElementsByClassName('top5-li');

				liTop[i].innerHTML = data.results[i].name;
			}
			var x = 0;
			getDetails()
			var gameImage = data.results[x].background_image;
			var gameTitle = data.results[x].name;
			$('#top5Img').attr('src', gameImage);
			$('.h2-image').append(gameTitle);
			var secondLi = document.getElementById('topLi2');

			secondLi.addEventListener('click', function() {
				x = 1;
				callAPI();
			});
		}
	);
}
callAPI();

function getDetails() {
	if ()
}
*/
/*
var apiData = {
	url: 'https://api.rawg.io/api/games?dates=',
	timeframe: lastYear,
	sorting: popCat
};

var { url, timeframe, sorting } = apiData;
var apiUrl = `${url}${timeframe}${sorting}`;
*/

/*
var timeframe = lastWeek;
var sorting = ratedCat;
*/
