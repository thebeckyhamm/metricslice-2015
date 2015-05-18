




    var sunPosition = function() {

        var now = moment();
        var sunrise, sunset, noon, $sun, $wrapper, $body;

        $body = $("body");
        $sun = $(".sun");
        $wrapper = $(".wrapper");
        $greeting = $(".greeting");

        sunrise = moment("06:30:00", "HH:mm:ss");    
        sunset = moment("19:00:00", "HH:mm:ss");
        noon = moment("12:00:00", "HH:mm:ss");
        

        // get dimensions of wrapper
        var wrapperWidth = ($wrapper.outerWidth() - 100);
        var wrapperHeight = ($wrapper.outerHeight() - 100);

        var daylightMinutes = sunset.diff(sunrise, "minutes");
        var minsTilSunset = sunset.diff(now, "minutes", true);
        var minsFromSunrise = now.diff(sunrise, "minutes", true);

        var widthFrac = wrapperWidth / daylightMinutes;

        var medianDaylight = sunrise.clone().add((daylightMinutes / 2), "minutes");
        $sun.hide();

        // if between midnight and 3am
        if (now <= moment("03:00:00", "HH:mm:ss") && now > moment("00:00:01", "HH:mm:ss")) {
            makeStars(wrapperWidth, wrapperHeight);
            $body.removeClass().addClass("night");
            $greeting.text("Having a good night?");

        }
        // if between 3am and sunrise
        else if (now <= sunrise && now > moment("03:00:00", "HH:mm:ss")) {
            makeStars(wrapperWidth, wrapperHeight);
            $body.removeClass().addClass("night");
            $greeting.text("You're up early!");

        }


        // if daytime
        else if (now >= sunrise && now < sunset) {

            // set position left to right
            $sun.css("left", (minsFromSunrise * widthFrac)).show();
            var timeTilNoon = noon.diff(now, "minutes", true);


            // Set position top to bottom
            if (now < medianDaylight) {
                var timeTilMid = medianDaylight.diff(now, "minutes", true);
                var totalMorningHours = medianDaylight.diff(sunrise, "minutes", true);

                $sun.css("top", ((timeTilMid / totalMorningHours) * wrapperHeight) + "px");
                $body.removeClass().addClass("midday");

                // if near sunrise
                if (now.diff(sunrise, "hours") <= 1) {
                    $body.removeClass().addClass("dawn");
                }

                if (timeTilNoon > 0 ) {
                    $greeting.text("Good morning!");
                }

                else if (timeTilNoon <= 0) {
                    $greeting.text("Good afternoon!");
                }
            }
            else if (now >= medianDaylight) {
                var afternoonProgress = now.diff(medianDaylight, "minutes", true);
                var totalAfternoonHours = sunset.diff(medianDaylight, "minutes", true);

                $sun.css("top", ((afternoonProgress / totalAfternoonHours) * wrapperHeight) + "px");
                $body.removeClass().addClass("midday");

                // if 1-3 hours before sunset
                if (sunset.diff(now, "hours") <=3 && sunset.diff(now, "hours") > 1) {
                    $body.removeClass().addClass("late-day");
                }

                // if 1 hour til sunset
                else if (sunset.diff(now, "hours") <= 1 ) {
                    $body.removeClass().addClass("sunset");
                    $greeting.text("Good evening!");
                } 

                if (timeTilNoon > 0 ) {
                    $greeting.text("Good morning!");
                }

                else if (timeTilNoon <= 0) {
                    $greeting.text("Good afternoon!");
                }           
            }
        } 
        // if between sunset and dusk
        else if (now >= sunset && now < sunset.add(1, "hour")) {
            $sun.hide();
            $body.removeClass().addClass("dusk");
            $greeting.text("Good evening!");
        } 

        else {
            makeStars(wrapperWidth, wrapperHeight);
            $body.removeClass().addClass("night");
            $greeting.text("Good evening!");
        }

    }

    var makeStars = function(w, h) {
        var $body = $("body");

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



$(function() {
    sunPosition();
});

setInterval(sunPosition, 60000);






