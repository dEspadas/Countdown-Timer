(function () {
    "use strict";
    /*jslint browser: true */
    
    /* Example for a custom target date in 28, April, 2015 */
    var targetDate = new Date(2015, 3, 28),
        dateHtmlElements = {
            elementDays: document.getElementById('cdt--days'),
            elementHours: document.getElementById('cdt--hours'),
            elementMinutes: document.getElementById('cdt--minutes'),
            elementSeconds: document.getElementById('cdt--seconds')
        };

    function countdownTimer() {
        
        //Getting client-side date() at this example.
        var currentDateNow = new Date(),
            remainingTime = targetDate.valueOf() - currentDateNow.valueOf(),
            timeToTarget = {
                daysLeft: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
                hoursLeft: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
                minutesLeft: Math.floor((remainingTime / (1000 * 60)) % 60),
                secondsLeft: Math.floor((remainingTime / (1000)) % 60)
            };
        
        //Returning if counter reaches 0.
        if (remainingTime < 1000) { return; }
        
        dateHtmlElements.elementDays.innerHTML = timeToTarget.daysLeft < 10 ? '0' + timeToTarget.daysLeft : timeToTarget.daysLeft;
        dateHtmlElements.elementHours.innerHTML = timeToTarget.hoursLeft < 10 ? '0' + timeToTarget.hoursLeft : timeToTarget.hoursLeft;
        dateHtmlElements.elementMinutes.innerHTML = timeToTarget.minutesLeft < 10 ? '0' + timeToTarget.minutesLeft : timeToTarget.minutesLeft;
        dateHtmlElements.elementSeconds.innerHTML = timeToTarget.secondsLeft < 10 ? '0' + timeToTarget.secondsLeft : timeToTarget.secondsLeft;
    }
    
    setInterval(countdownTimer, 1000);
    
}());