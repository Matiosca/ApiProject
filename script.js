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
const year2016 = '2016-01-01,2016-12-31';
const year2012 = '2012-01-01,2012-12-31';
const year2008 = '2008-01-01,2008-12-31';

// category var for API calls
const ratedCat = '&ordering=-rating';
const popCat = '&ordering=-added';

// assign var to nav-li (to add and remove class .active [border-bottom])
const liRated = document.getElementById('navLiRated');
const liPop = document.getElementById('navLiPop');
const liReleased = document.getElementById('navLiReleased');

// assign var to radio buttons
const topRatedWeek = document.getElementById('ratedWeekly');
const topRatedMonth = document.getElementById('ratedMonthly');
const topRatedYear = document.getElementById('ratedYearly');

const topPopWeek = document.getElementById('popWeekly');
const topPopMonth = document.getElementById('popMonthly');
const topPopYear = document.getElementById('popYearly');

const userYearInput = document.getElementById('userYearInput');
const best2012 = document.getElementById('best2012');
const best2008 = document.getElementById('best2008');

// assign var to DOM elements
const spanTimeframe = document.getElementById('span-timeframe');
const spanCategory = document.getElementById('span-category');

// variables for callAPI()
const ulTop = document.getElementById('top5ul');

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
	} else if (best2012.checked || best2008.checked) {
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
	} else if (best2012.checked) {
		timeframe = year2012;

		spanTimeframe.innerHTML = '2012';
	} else if (best2008.checked) {
		timeframe = year2008;

		spanTimeframe.innerHTML = '2008';
	}
}
// executing function so js recognizes topRatedWeek RADIO is checked by default
activeTimeframe();

function sortByInput() {
	if (userYearInput.value === '') {
		alert('Please fill year field before searching');
	} else if (userYearInput.value < 1976 || userYearInput.value > 2020) {
		alert('Please choose an year between 1976 and 2020');
	} else {
		//unchecking all radio buttons
		topRatedWeek.checked = false;
		topRatedMonth.checked = false;
		topRatedYear.checked = false;
		topPopWeek.checked = false;
		topPopMonth.checked = false;
		topPopYear.checked = false;
		best2012.checked = false;
		best2008.checked = false;

		timeframe = `${userYearInput.value}-01-01,${userYearInput.value}-12-31`;
		sorting = popCat;

		spanCategory.innerHTML = 'Best 5 videogames in';
		liRated.classList.remove('active');
		liPop.classList.remove('active');
		liReleased.classList.add('active');

		spanTimeframe.innerHTML = `${userYearInput.value}`;
		callAPI();
		userYearInput.value = '';
	}
}

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

// example. without coding this way each time I was clicking on a new game title the platform field was displaying the available
// plats for the just clicked game but also keeping the old ones

const generateTop5 = data => {
	const gameName = document.getElementById('h2Image');
	const gamePic = document.getElementById('top5Img');
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

	const firstLi = document.getElementById('topLi1');
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

	const secondLi = document.getElementById('topLi2');
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

	const thirdLi = document.getElementById('topLi3');
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

	const fourthLi = document.getElementById('topLi4');
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

	const fifthLi = document.getElementById('topLi5');
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
