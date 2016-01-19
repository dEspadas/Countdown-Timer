(function () {
    "use strict";
    /*jslint browser: true */
    
	var _element = document.querySelector('#countdown_timer');
	
	if(!_element)
        return;
	
	var _cdt_config = {
			_year: _element.dataset.cdtYear,
			_month: _element.dataset.cdtMonth,
			_day: _element.dataset.cdtDay
	};
   
    //Set time style
    _element.innerHTML ="<style>#countdown_timer .cdt--itens {display: inline-block;margin: 5px 10px;text-align: center;position: relative;width: 52px;}#countdown_timer .cdt--itens:after {content: ':';font-size: 2em;position: absolute;top: 0;right: -15px;}#countdown_timer .cdt--itens:last-of-type:after {display: none;} #countdown_timer .cdt--number_box {display: block;font-size: 2em;font-weight: 800;}</style>";
	
	//Append time html elements
    _element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--days\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Days</span></div>";
    _element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--hours\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Hours</span></div>";
    _element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--minutes\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Minutes</span></div>";
    _element.innerHTML +="<div class=\"cdt--itens\"><span id=\"cdt--seconds\" class=\"cdt--number_box\">--</span><span class=\"cdt--label\">Seconds</span></div>";

	
	//Set Target date
    var targetDate = new Date(_cdt_config._year, _cdt_config._month, _cdt_config._day),
        dateHtmlElements = {
            elementDays: document.getElementById('cdt--days'),
            elementHours: document.getElementById('cdt--hours'),
            elementMinutes: document.getElementById('cdt--minutes'),
            elementSeconds: document.getElementById('cdt--seconds')
        };

    var _countdownTimer = function () {
        
        //Getting client-side date() at this example.
        var currentDateNow = new Date(),
            remainingTime = targetDate.valueOf() - currentDateNow.valueOf(),
            timeToTarget = {
                daysLeft: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
                hoursLeft: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
                minutesLeft: Math.floor((remainingTime / (1000 * 60)) % 60),
                secondsLeft: Math.floor((remainingTime / (1000)) % 60)
            };
        
        //Breaking out if counter reaches 0.
        if (remainingTime < 1000)
            return;
        
        dateHtmlElements.elementDays.innerHTML = timeToTarget.daysLeft < 10 ? '0' + timeToTarget.daysLeft : timeToTarget.daysLeft;
        dateHtmlElements.elementHours.innerHTML = timeToTarget.hoursLeft < 10 ? '0' + timeToTarget.hoursLeft : timeToTarget.hoursLeft;
        dateHtmlElements.elementMinutes.innerHTML = timeToTarget.minutesLeft < 10 ? '0' + timeToTarget.minutesLeft : timeToTarget.minutesLeft;
        dateHtmlElements.elementSeconds.innerHTML = timeToTarget.secondsLeft < 10 ? '0' + timeToTarget.secondsLeft : timeToTarget.secondsLeft;
    };
    
    function main() {   
		_countdownTimer(); //To make the counter works at t = 0, will be fixed later.
		setInterval(_countdownTimer, 1000);
	}
	
	return main;
}()());