# Countdown Timer

Countdown Timer is a simple javascript timer. Set the target date in the your container and you are good to go.

### Version
1.0


### Configuration

<ol>
	<li>Set a timer container. It must have id="countdown_timer" for the timer to work.</li>
	<li>Set end month, day and year. All must be filled. You should do the following at the same element where the id is:
		<ul>
			<li>data-cdt-month = countdown end month,</li>
			<li>data-cdt-day = countdown end day,</li>
			<li>data-cdt-year = countdown end year, must be a 4 digit format.</li>
		</ul>
	</li>
	<li>Set the display format. There is two options for now:
		<ul>
			<li>data-cdt-format="d:H:M:S", for it to display the full countdown format,
			<li>data-cdt-format="d", for it to display only the days left 'till inputted end. (default, if no options are given).
		</ul>
	</li>
	<li>Put the countdown-timer.min.js at the end of the html file.</li>
</ol>

### Todo's

A lot!

<ul>
    <li>More css flexibility, now the elements are kind of fixed,</li>
    <li>More display formats, maybe,</li>
    <li>Web component. (maybe)</li>
</ul>

License
----

MIT

