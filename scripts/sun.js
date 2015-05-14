

var sky = (function() {
    var now = moment();
    var nowEST = moment().tz("America/New_York").format("Z");
    var sunrise, sunset, $sun, $wrapper, $body;

    $sun = $(".sun");
    $wrapper = $(".wrapper");
    $body = $("body");

    // call API
    var callAPI = function() {
        var url = "http://api.sunrise-sunset.org/json?lat=27.7844232&lng=-82.6339987&date=today";
        $.ajax({
            url: url
        })
        .done(function(data) {
            sunPosition(data);
        });
    };

    var sunPosition = function(data) {

        now = moment();

        // get sunrise into correct format
        if (data && data.results.sunrise) {
            sunrise = moment
                .utc(data.results.sunrise, "HH:mm:ss A")
                .local().format("HH:mm:ss");

            //sunrise = sunrise.format("HH:mm:ss");
        }
        else {
            sunrise = moment("06:30:00", "HH:mm:ss").format("HH:mm:ss");    
        }

        // get sunset into correct format
        if (data && data.results.sunset) {
            sunset = moment(moment().format('YYYY-MM-DD ') + 
                   data.results.sunset.toLowerCase() + 
                   "Z", "YYYY-MM-DD hh:mm:ss aZ").format("HH:mm:ss");
        }

        else {
            sunset = moment("19:00:00", "HH:mm:ss").format("HH:mm:ss");
        }

        // get dimensions of wrapper
        var wrapperWidth = ($wrapper.outerWidth() - 100);
        var wrapperHeight = ($wrapper.outerHeight() - 100);

        var daylightMinutes = moment(sunset, "HH:mm:ss").diff(moment(sunrise, "HH:mm:ss"), "minutes");
        var minsTilSunset = moment(sunset, "HH:mm:ss").diff(now, "minutes", true);
        var minsFromSunrise = now.diff(moment(sunrise, "HH:mm:ss"), "minutes", true);


        var widthFrac = wrapperWidth / daylightMinutes;

        var medianDaylight = moment(sunrise, "HH:mm:ss").add((daylightMinutes / 2), "minutes").format("HH:mm:ss");
        $sun.hide();

        // if daytime
        if (now.format("HH:mm:ss") >= sunrise && now.format("HH:mm:ss") < sunset) {

            // set position left to right
            $sun.css("left", (minsFromSunrise * widthFrac)).show();


            // Set position top to bottom
            if (now.format("HH:mm:ss") < medianDaylight) {
                var timeTilNoon = moment(medianDaylight, "HH:mm:ss").diff(now, "minutes", true);
                var totalMorningHours = moment(medianDaylight, "HH:mm:ss").diff(moment(sunrise, "HH:mm:ss"), "minutes", true);

                $sun.css("top", ((timeTilNoon / totalMorningHours) * wrapperHeight) + "px");
                $body.removeClass().addClass("midday");

                // if near sunrise
                if (now.diff(moment(sunrise, "HH:mm:ss"), "hours") <= 1) {
                    $body.removeClass().addClass("dusk");
                }
            }
            else if (now.format("HH:mm:ss") >= medianDaylight) {
                var afternoonProgress = now.diff(moment(medianDaylight, "HH:mm:ss"), "minutes", true);
                var totalAfternoonHours = moment(sunset, "HH:mm:ss").diff(moment(medianDaylight, "HH:mm:ss"), "minutes", true);

                $sun.css("top", ((afternoonProgress / totalAfternoonHours) * wrapperHeight) + "px");

                // if 3 hours before sunset
                if (moment(sunset, "HH:mm:ss").diff(now, "hours") <=3 && moment(sunset, "HH:mm:ss").diff(now, "hours") > 1) {
                    $body.removeClass().addClass("late-day");
                }

                // if 1 hour til sunset
                else if (moment(sunset, "HH:mm:ss").diff(now, "hours") <= 1 ) {
                    $body.removeClass().addClass("sunset");
                }            
            }
        } 
        // if between sunset and dusk
        else if (now.format("HH:mm:ss") >= sunset && now.format("HH:mm:ss") < sunset.add(1, "hour")) {
            $sun.hide();
            $body.removeClass().addClass("dusk");
        } 

        else {
            makeStars(wrapperWidth, wrapperHeight);
            $body.removeClass().addClass("night");
        }

    }

    var makeStars = function(w, h) {
        for (i = 0; i < 15; i++) {
            var left = Math.floor(Math.random() * (w + 100)) + 1;
            var top = Math.floor(Math.random() * (h + 100)) + 1;
            var $star = $("<span class='star'></span>").css({
                "left": left,
                "top":  top
            });

            $body.append($star);
        }
    }

    var checkTZ = function() {
        if (now.format("Z") === nowEST) {
            callAPI();
            setInterval(callAPI, 60000);
        }
        else {
            sunPosition();
            setInterval(sunPosition, 60000);
        }
    }
    checkTZ();


});


$(function() {
    sky();
});





