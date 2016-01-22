(function () {
    "use strict";
    /*jslint browser: true */
    
    function _init() {
    	//Must have id #countdown_timer in the container div
		var _element = document.querySelector('#countdown_timer');

		//Silently quitting if no timer element is set in html.
		if(!_element)
	        return;
		
		var	_config = {
				container: _element,
				year: _element.dataset.cdtYear,
				month: _element.dataset.cdtMonth - 1, //Months are set from 0 to 11
				day: _element.dataset.cdtDay,
				format: _element.dataset.cdtFormat
			};

		//Test for valid date numbers to avoid confusion
		try {
			//Need work in the regex. 
			var _dateRegex = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/;
			var _fullDate = _config.day + '-' + (_config.month + 1) + '-' + _config.year;
			if(!_fullDate.match(_dateRegex))
				throw new Error('Invalid Countdown Timer date. Check the inputted day, month and year for problems.');
		} catch(e) {
			console.log(e);
			return false;
		}

		return _config;

    }	

    function _htmlCreator(container, format) {

    	var _el = container;

	    //Set Timer style
	    _el.innerHTML = "<style>#countdown_timer .cdt--itens {display: inline-block;margin: 5px 10px;text-align: center;position: relative;width: 52px;}#countdown_timer .cdt--itens:after {content: ':';font-size: 2em;position: absolute;top: 0;right: -15px;}#countdown_timer .cdt--itens:last-of-type:after {display: none;} #countdown_timer .cdt--number_box {display: block;font-size: 2em;font-weight: 800;}</style>";

		//Append Timer HTML elements
    	_el.innerHTML += "<div class=\"cdt--itens\"><span id=\"cdt--days\" class=\"cdt--number_box\">00</span><span class=\"cdt--label\">Days</span></div>";
	    if (format == "d:H:M:S") {
	    	_el.innerHTML += "<div class=\"cdt--itens\"><span id=\"cdt--hours\" class=\"cdt--number_box\">00</span><span class=\"cdt--label\">Hours</span></div>";
	    	_el.innerHTML += "<div class=\"cdt--itens\"><span id=\"cdt--minutes\" class=\"cdt--number_box\">00</span><span class=\"cdt--label\">Minutes</span></div>";
	    	_el.innerHTML += "<div class=\"cdt--itens\"><span id=\"cdt--seconds\" class=\"cdt--number_box\">00</span><span class=\"cdt--label\">Seconds</span></div>";
		}
	}

    function _getHtmlElements() {

	    //Get and return HTML elements
	    var dateHtmlElements = {
	            elementDays: document.getElementById('cdt--days') || false,
	            elementHours: document.getElementById('cdt--hours') || false,
	            elementMinutes: document.getElementById('cdt--minutes') || false,
	            elementSeconds: document.getElementById('cdt--seconds') || false
	        };

	     return dateHtmlElements;
    }

    function _updateTimerValues(year, month, day) {

		//Set Target date
	    var _targetDate = new Date(year, month, day);

	    //Calculate and return difference from target and today
    	var _currentDateNow = new Date(),
    		_remainingTime = _targetDate.valueOf() - _currentDateNow.valueOf(),
    		timerValues;

  		return timerValues = {
		  	currentDateNow: _currentDateNow,
   			remainingTime: _remainingTime,
			daysLeft: Math.floor(_remainingTime / (1000 * 60 * 60 * 24)),
			hoursLeft: Math.floor((_remainingTime / (1000 * 60 * 60)) % 24),
			minutesLeft: Math.floor((_remainingTime / (1000 * 60)) % 60),
			secondsLeft: Math.floor((_remainingTime / (1000)) % 60)
		}

    }
	
    function _countdownTimer(year, month, day, format, container, elDay, elHours, elMinutes, elSeconds) {
        
    	var _timerNewValues = _updateTimerValues(year, month, day, format);

        //Breaking out if counter reaches 0.
        if (_timerNewValues.remainingTime < 1000)
            return;

        elDay.innerHTML = _timerNewValues.daysLeft < 10 ? '0' + _timerNewValues.daysLeft : _timerNewValues.daysLeft;
		if (format == "d:H:M:S") {
	        elHours.innerHTML = _timerNewValues.hoursLeft < 10 ? '0' + _timerNewValues.hoursLeft : _timerNewValues.hoursLeft;
	        elMinutes.innerHTML = _timerNewValues.minutesLeft < 10 ? '0' + _timerNewValues.minutesLeft : _timerNewValues.minutesLeft;
	        elSeconds.innerHTML = _timerNewValues.secondsLeft < 10 ? '0' + _timerNewValues.secondsLeft : _timerNewValues.secondsLeft;
	    }

    };

    return function start() {

		//Test for errors in _init() and if so, quit.
		var init = _init();
		if (!init) 
			return;

		//Otherwise execute Timer;
    	_init();

		_htmlCreator(init.container, init.format);

		var timerHtmlElements = _getHtmlElements();

		_countdownTimer(init.year, 
						init.month, 
						init.day, 
						init.format, 
						init.container, 
						timerHtmlElements.elementDays, 
						timerHtmlElements.elementHours, 
						timerHtmlElements.elementMinutes, 
						timerHtmlElements.elementSeconds
						);//Needed for the timer not to start at zero.

		setInterval(function() {
			_countdownTimer(init.year, 
							init.month, 
							init.day, 
							init.format, 
							init.container, 
							timerHtmlElements.elementDays, 
							timerHtmlElements.elementHours, 
							timerHtmlElements.elementMinutes, 
							timerHtmlElements.elementSeconds
							);
		}, 1000);

    }

}()());