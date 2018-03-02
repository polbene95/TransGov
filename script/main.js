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

    $("#about").on("click", function () {
        readMore("about");
    });
    $("#history").on("click", function () {
        readMore("history");
    });
});


function readMore(button) {
    if ($("#" + button).val() == "hidden") {
        console.log("hola")
        $("." + button).slideDown();
        $("#" + button).val("");
        $("#" + button).val("shown");
        $("#" + button).text("");
        $("#" + button).text("Read Less");
    } else {
        $("." + button).slideUp();
        $("#" + button).val("");
        $("#" + button).val("hidden");
        $("#" + button).text("");
        $("#" + button).text("Read More");
    }

}

function readLess(button) {

    $("." + button).slideUp();
    $("#" + button).val("");
    $("#" + button).val("hidden");
    $("#" + button).text("");
    $("#" + button).text("Read More");
}
