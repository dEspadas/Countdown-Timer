/* Example for a custom target date in 28, April, 2016 */

var cdt_widget = {};

var cdt_config = (function () {
    "use strict";
    /*jslint browser: true */

    var hasCountdownTimer,
        cdt_config_year,
        cdt_config_month,
        cdt_config_day;

    if (document.querySelector('#countdown_timer')) {
        hasCountdownTimer = true; 
    } else {
        hasCountdownTimer = false;              
    }
    
    if (hasCountdownTimer) {
        cdt_config_year = 2016,
        cdt_config_month = 3,
        cdt_config_day = 28;
    }
    
    return {
        hasCountdownTimer: hasCountdownTimer,
        cdt_config_year: cdt_config_year,
        cdt_config_month: cdt_config_month,
        cdt_config_day: cdt_config_day
    }
    
}());

(function (cw_ns, config_vars) {
    "use strict";
    /*jslint browser: true */
    
    if(!config_vars.hasCountdownTimer)
        return;
    
    var targetDate = new Date(config_vars.cdt_config_year, config_vars.cdt_config_month, config_vars.cdt_config_day),
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
    }
    
        
    _countdownTimer(); //To make the counter works at t = 0, will be fixed later.
    setInterval(_countdownTimer, 1000);
    
}(cdt_widget, cdt_config));