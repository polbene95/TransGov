$(".about").hide();
$(".history").hide();

$(document).ready(function () {


    $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json) {
        senateData = json;
        console.log(senateData);
    });

    $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json) {
        houseData = json;
        console.log(houseData);
    });

    if ($("#about").val() == "hidden") {
        $("#about").on("click", function () {
            readMore("about");
        });
    } else {
        $("#about").on("click", function () {
            readLess("about");
        });
    }

    $("#history").on("click", function () {
        if ($(".history").hide()) {
            readMore("history");
        } else {
            readLess("history");
        }
    })
});


function readMore(button) {

    $("." + button).slideDown();
    $("#" + button).val("");
    $("#" + button).val("shown");
    $("#" + button).text("");
    $("#" + button).text("Read Less");
}

function readLess(button) {

    $("." + button).slideUp();
    $("#" + button).val("");
    $("#" + button).val("hidden");
    $("#" + button).text("");
    $("#" + button).text("Read More");
}
