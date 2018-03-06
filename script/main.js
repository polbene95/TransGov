$(".about").hide();
$(".history").hide();

var repCheck = document.getElementById("rep");
var demCheck = document.getElementById("dem");
var indCheck = document.getElementById("ind");
var selector = document.getElementById("stateFilter");

$(document).ready(function () {


    $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json) {
        senateData = json;
        console.log(senateData);
        //        selectedFilter(senateData);
        var selectedMembers = selectedFilter(senateData);
        mainTable(selectedMembers, "senate-main-table");
        stateList(senateData);

        repCheck.addEventListener("click", function () {
            console.log("hola");
            selectedMembers = selectedFilter(senateData);
            mainTable(selectedMembers, "senate-main-table");
        }); 
        demCheck.addEventListener("click", function () {
            console.log("hola");
            selectedMembers = selectedFilter(senateData);
            mainTable(selectedMembers, "senate-main-table");
        }); 
        indCheck.addEventListener("click", function () {
            console.log("hola");
            selectedMembers = selectedFilter(senateData);
            mainTable(selectedMembers, "senate-main-table");
        });
        selector.addEventListener("change", function () {
            console.log("hola");
            selectedMembers = selectedFilter(senateData);
            mainTable(selectedMembers, "senate-main-table");
        }); 
                                  


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

function mainTable(members, table) {
    var table = document.getElementById(table);
    table.innerHTML = "";
    //    var members = array.results["0"].members;

    for (let i = 0; i < members.length; i++) {

        var firstName = members[i].first_name;
        var midName = members[i].middle_name;
        if (midName == null) {
            midName = "";
        }
        var lastName = members[i].last_name;

        var fullName = lastName + ", " + firstName + " " + midName;
        var party = members[i].party;
        var state = members[i].state;
        var seniority = members[i].seniority;
        var votes = members[i].votes_with_party_pct;
        var url = members[i].url;

        var row = document.createElement("tr");
        var nameCol = document.createElement("td");
        var partyCol = document.createElement("td");
        var stateCol = document.createElement("td");
        var seniorityCol = document.createElement("td");
        var votesCol = document.createElement("td");
        var ancor = document.createElement("a");

        ancor.setAttribute("href", url);
        ancor.setAttribute("target", "_blank");

        ancor.append(fullName);
        nameCol.append(ancor);
        partyCol.append(party);
        stateCol.append(state);
        seniorityCol.append(seniority);
        votesCol.append(votes + " %");

        row.append(nameCol);
        row.append(partyCol);
        row.append(stateCol);
        row.append(seniorityCol);
        row.append(votesCol);

        table.append(row);

    }
}

function stateList(array) {
    var members = array.results["0"].members;
    var select = document.getElementById("stateFilter");
    var newStates = [];
    var finalStates = [];


    for (var i = 0; i < members.length; i++) {
        var state = members[i].state;
        newStates.push(state);
    }

    for (var j = 0; j < newStates.length; j++) {
        if (finalStates.indexOf(newStates[j]) == -1) {
            finalStates.push(newStates[j]);
        }
    }
    finalStates.sort();
    for (var k = 0; k < finalStates.length; k++) {
        var option = document.createElement("option");
        option.setAttribute("value", finalStates[k], )
        option.innerHTML = finalStates[k];
        select.appendChild(option);

    }
}

function selectedFilter(array) {

    var members = array.results["0"].members;

    var repCheck = document.getElementById("rep");
    var demCheck = document.getElementById("dem");
    var indCheck = document.getElementById("ind");

    var selector = document.getElementById("stateFilter");

    var selectedMembers = [];

    for (var i = 0; i < members.length; i++) {

        var party = members[i].party;
        var state = members[i].state;

        if ($(selector).val() == state || $(selector).val() == "All") {

            if (selectedMembers.indexOf(members[i]) == -1) {

                if (repCheck.checked && party == "R") {
                    selectedMembers.push(members[i]);
                }
                if (demCheck.checked && party == "D") {
                    selectedMembers.push(members[i]);
                }
                if (indCheck.checked && party == "I") {
                    selectedMembers.push(members[i]);
                }
            }
        }
    }

    return selectedMembers;
}
