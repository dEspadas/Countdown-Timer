(function () {
    "use strict";
    /*jslint browser: true */
    
	var _element = document.querySelector('#countdown_timer');
	
	//Silently quitting if no timer element is set in html.
	if(!_element)
        return;
	
	var _currentDate = new Date(),
		_cdt_config = {
			year: _element.dataset.cdtYear || _currentDate.getFullYear(),
			month: _element.dataset.cdtMonth - 1|| _currentDate.getMonth(), //Months are set from 0 to 11
			day: _element.dataset.cdtDay || _currentDate.getDate()
		};
	
	//Test for valid date numbers to avoid confusion
	try {
		//Need work in the regex.
		var _dateRegex = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
		var _fullDate = _cdt_config.day + '-' + (_cdt_config.month + 1) + '-' + _cdt_config.year;
		if(!_fullDate.match(_dateRegex))
			throw new Error('Invalid date. Check your the inputed day, month or year for problems.');
	} catch(e) {
		console.log(e);
		return;
	}
	
	
    //Set Timer style
    _element.innerHTML ="<style>#countdown_timer .cdt--itens {display: inline-block;margin: 5px 10px;text-align: center;position: relative;width: 52px;}#countdown_timer .cdt--itens:after {content: ':';font-size: 2em;position: absolute;top: 0;right: -15px;}#countdown_timer .cdt--itens:last-of-type:after {display: none;} #countdown_timer .cdt--number_box {display: block;font-size: 2em;font-weight: 800;}</style>";
	
	//Append Timer HTML elements
	if (_cdt_config.day) {
    	_element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--days\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Days</span></div>";
    	_element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--hours\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Hours</span></div>";
    	_element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--minutes\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Minutes</span></div>";
    	_element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--seconds\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Seconds</span></div>";
	}


    //Get HTML elements
    var _dateHtmlElements = {
            elementDays: document.getElementById('cdt--days') || false,
            elementHours: document.getElementById('cdt--hours') || false,
            elementMinutes: document.getElementById('cdt--minutes') || false,
            elementSeconds: document.getElementById('cdt--seconds') || false
        };

    function _updateTimerValues() {

		//Set Target date
	    var _targetDate = new Date(_cdt_config.year, _cdt_config.month, _cdt_config.day);

    	var _currentDateNow = new Date(),
    		_remainingTime = _targetDate.valueOf() - _currentDateNow.valueOf(),
    		timerValues;

  		return timerValues = {
		  	_currentDateNow: _currentDateNow,
   			_remainingTime: _remainingTime,
			_daysLeft: Math.floor(_remainingTime / (1000 * 60 * 60 * 24)),
			_hoursLeft: Math.floor((_remainingTime / (1000 * 60 * 60)) % 24),
			_minutesLeft: Math.floor((_remainingTime / (1000 * 60)) % 60),
			_secondsLeft: Math.floor((_remainingTime / (1000)) % 60)
		}

    }

	
    function _countdownTimer() {
        
    	var timerNewValues = _updateTimerValues();

        //Breaking out if counter reaches 0.
        if (timerNewValues._remainingTime < 1000)
            return;
		
        _dateHtmlElements.elementDays.innerHTML = timerNewValues._daysLeft < 10 ? '0' + timerNewValues._daysLeft : timerNewValues._daysLeft;
        _dateHtmlElements.elementHours.innerHTML = timerNewValues._hoursLeft < 10 ? '0' + timerNewValues._hoursLeft : timerNewValues._hoursLeft;
        _dateHtmlElements.elementMinutes.innerHTML = timerNewValues._minutesLeft < 10 ? '0' + timerNewValues._minutesLeft : timerNewValues._minutesLeft;
        _dateHtmlElements.elementSeconds.innerHTML = timerNewValues._secondsLeft < 10 ? '0' + timerNewValues._secondsLeft : timerNewValues._secondsLeft;

    };
    
	_countdownTimer(); //To make the counter works at t = 0, will be fixed later.
	setInterval(_countdownTimer, 1000);

}());