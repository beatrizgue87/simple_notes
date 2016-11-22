function shake(div) {
    $('#' + div).animate({
        'margin-left': '-=10px',
        'margin-right': '+=10px'
    }, 100, function() {
        $('#' + div).animate({
            'margin-left': '+=10px',
            'margin-right': '-=10px'
        }, 100, function() {
            $('#' + div).animate({
                'margin-left': '-=10px',
                'margin-right': '+=10px'
            }, 100, function() {
                $('#' + div).animate({
                    'margin-left': '+=10px',
                    'margin-right': '-=10px'
                });
            });
        });
    });
}
$(document).ready(function() {


    var count = 0;
    $('#addButton').click(function(event) {
        if (count > 0) {
            var lastTextarea = 'texta' + count;
            // var l = lastTextarea.val().length;
            // console.log(l);
            var l = $("#" + lastTextarea).val().length;
            console.log(l);


            if ((l === 0) && ($("#" + lastTextarea).is(':visible'))) {
                console.log(1);
                shake(lastTextarea);
                return;
            };

            var n = $(".note1").length;
            if ((n === 2) && ($("#" + lastTextarea).is(':visible'))) {
                console.log(2);
                shake(lastTextarea);
                return;

            };

        };
        count++;
        var c = count + 'notes';
        var cb = c + 'BTNclose';
        var save = 'sabeB' + count;
        var textarea = 'texta' + count;
        var sTittle = 'smallTextarea' + count;
        var s = c + 'small';
        var sb = s + 'BTNclose';
        var TrashB = 'trashButton' + count;
        var EditB = 'editButton' + count;
        var HR = 'hr' + c;

        $('#bigNotes').append('<div class="note1" id="' + c + '"><button type="button" class="close" id="' + cb + '">&times;</button><textarea class="textarea2" id="' + textarea + '" placeholder="Write your note here..."></textarea><div>');
        console.log(c);
        $('#smallul').append('<hr id="' + HR + '"><li id="li' + s + '"><div id="' + EditB + '" class="glyphicon glyphicon-edit edit" style="cursor:pointer" data-toggle="tooltip" title="Edit"></div><div id="' + TrashB + '" class="glyphicon glyphicon-trash trash" style="cursor:pointer" data-toggle="tooltip" title="Delete"></div><div class=st id="' + sTittle + '"></div></li>');
        console.log(s);
        console.log(sb);

        //Remove the big notes//

        $("#" + cb).click(function(event) {
            $("#" + c).fadeOut('100');


        });

        $("#li" + s).hover(function() {
                $("#" + TrashB).show(100);
                $("#" + EditB).show(100);
            },
            function() {
                $("#" + TrashB).hide();
                $("#" + EditB).hide();

            });


        $("#" + textarea).keyup(function(event) {
            $("#" + sTittle).empty();
            var min = 10;
            var tittle = $("#" + textarea).val().split("\n")[0];
            if (tittle.length > min) {
                tittle = tittle.slice(0, min) + "...";
            }
            $("#" + sTittle).append('<p class=pp>' + tittle + '</p>');


        });

        $("#" + TrashB).on('click', function(event) {
            event.preventDefault();
            $("#overlay").show('fast', function() {

            });

            $("#ok").click(function(event) {
                $("#overlay").fadeOut('50', function() {
                    $("#li" + s).remove();
                    $("#" + textarea).remove();
                    $('#' + cb).remove();
                    $('#' + c).remove();
                    $('#' + HR).remove();
                    count--;

                });

            });
            $("#cancel").click(function(event) {
                $("#overlay").fadeOut('50');
            });

        });

        $("#" + EditB).on('click', function(event) {
            $("#" + c).fadeIn('100');

        });
        $("#li" + s).on('click', function(event) {
            $("#" + c).fadeIn('100');


        });

        $("#" + sTittle).on('click', function(event) {

            event.preventDefault();

            var completeNote = $("#" + textarea).val();
            console.log(completeNote);
            $("#tnote").append('<p class="pp">' + completeNote + '</p>');
            $("#overlay2").show('fast');

            $("#ok2").click(function(event) {
                $("#overlay2").fadeOut('50', function() {
                    $("#tnote").empty();

                });

            });

        });

    });


    // $.getJSON("https://jsonip.com/?callback=?", function(data) {
    $.getJSON("https://ipinfo.io", function(data) {
        console.log(data.ip);
        //var getJ = $.getJSON("https://www.geoplugin.net/json.gp?ip=" + data.ip + "&jsoncallback=?", function(pl) {
        var city = data.city;
        console.log(city);

        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
            //change city variable dynamically as required
        var lastTemp = 0;

        function weatherCond() {
            $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function(w) {

                var date = w.query.results.channel.item.condition.date;
                // console.log(date);
                var temperature = w.query.results.channel.item.condition.temp;
                console.log(temperature);
                var conditions = w.query.results.channel.item.condition.text;
                //console.log(conditions);
                var code = w.query.results.channel.item.condition.code;
                console.log(code);
                var s = $.isNumeric(code);
                var number = parseInt(code);
                //console.log(s);
                //console.log(number);
                if (lastTemp === temperature) {
                    return;

                } else {
                    lastTemp = temperature;


                    $("#wData").css({ 'background-image': 'url(' + mapCode2back(number) + ')', 'background-repeat': 'no-repeat', 'background-position': 'center', 'background-size': 'cover' });
                    $("#cityW").text('' + city + '');
                    $("#temp").text('' + temperature + 'ºC');
                    $("#image").html('<img src="http://l.yimg.com/a/i/us/we/52/' + code + '.gif" width="104" height="104" title="' + conditions + '">');
                    $("#condW").text('' + conditions + '');
                }


                // $('#temp').html("Temperature in " + city + " is " + data.query.results.channel.item.condition.temp + "°C");
            });


        };
        weatherCond();
        setInterval(weatherCond, 1000000);



        // getJ.fail(function() {
        //     console.log("error");
        //     alert('Server is down. Please wait 1 minute and try again.')
        // });
    });


});



function mapCode2back(number) {
    switch (number) {
        case 4:
            return "./img/thunderstorm_code4.jpg";
            break;
        case 5:
            return "./img/mRainSnow_code5.jpg";
            break;
        case 8:
            return "./img/freezingDizzle_code8.jpg";
            break;
        case 11:
            return "./img/shower_code11.jpg";
            break;
        case 15:
            return "./img/snow_code15.jpg";
            break;
        case 16:
            return "./img/snow_code15.jpg";
            break;
        case 20:
            return "./img/foggy_code20.jpg";
            break;
        case 23:
            return "./img/windy_code24.jpg";
            break;
        case 24:
            return "./img/windy_code24.jpg";
            break;
        case 25:
            return "./img/cold_code25.jpg";
            break;
        case 27:
            return "./img/mostlycloudy_code27.jpg";
            break;
        case 31:
            return "./img/night_code31.jpg";
            break;
        case 32:
            return "./img/sunny_code32.jpg";
            break;
        case 39:
            return "./img/scatteredShowers_code39.jpg";
            break;
        default:
            return "./img/default.jpg";


    }

}

function openNav() {
    document.getElementById("smallNotes").style.width = "45%";
}

function closeNav() {
    document.getElementById("smallNotes").style.width = "0";
}
