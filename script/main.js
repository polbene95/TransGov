$(".about").hide();
$(".history").hide();

$(document).ready(function () {

    if (window.location.pathname == "/TransGov/senate-data.html") {

        $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json) {
            senateData = json;
            activeFilters(senateData, "senate-main-table");
        });
    }
    if (window.location.pathname == "/TransGov/senate_attendance.html") {
        $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json) {
            senateData = json;
            generalInfo(senateData);
            leastEngaged(senateData);
            mostEngaged(senateData);
        });

    }
    if (window.location.pathname == "/TransGov/senate_house_party_loyalty.html") {
        $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json) {
            senateData = json;
            generalInfo(senateData);
            leastLoyal(senateData);
            mostLoyal(senateData);
        });
    }

    if (window.location.pathname == "/TransGov/house-data.html") {
        $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json) {
            houseData = json;
            console.log(houseData);

            activeFilters(houseData, "house-main-table");
        });
    }
    if (window.location.pathname == "/TransGov/house_attendance.html") {
        $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json) {
            houseData = json;

            generalInfo(houseData);
            leastEngaged(houseData);
            mostEngaged(houseData);
        });
    }
    if (window.location.pathname == "/TransGov/house_house_party_loyalty.html") {
        $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json) {
            houseData = json;
            generalInfo(houseData);
            leastLoyal(houseData);
            mostLoyal(houseData);
        });
    }

    $("#about").on("click", function () {
        readMore("about");
    });
    $("#history").on("click", function () {
        readMore("history");
    });

});

///////////////////////////HOME FUNCTIONS//////////////////////////////////

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

//////////////////////////CONGRES FUNCTIONS////////////////////////////////

function mainTable(members, table) {
    var table = document.getElementById(table);
    if (table != null) {
        table.innerHTML = "";

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
}

function stateList(array) {
    var members = array.results["0"].members;
    var select = document.getElementById("stateFilter");
    var newStates = [];
    var finalStates = [];

    if (select != null) {

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

function activeFilters(data, table) {

    ////DROPDOWN GENERATOR////
    stateList(data);
    ////FILTERS ACTIVATION////
    var repCheck = document.getElementById("rep");
    var demCheck = document.getElementById("dem");
    var indCheck = document.getElementById("ind");
    var selector = document.getElementById("stateFilter");

    var selectedMembers = selectedFilter(data);
    mainTable(selectedMembers, table);

    repCheck.addEventListener("click", function () {
        selectedMembers = selectedFilter(data);
        mainTable(selectedMembers, table);
    });
    demCheck.addEventListener("click", function () {
        selectedMembers = selectedFilter(data);
        mainTable(selectedMembers, table);
    });
    indCheck.addEventListener("click", function () {
        selectedMembers = selectedFilter(data);
        mainTable(selectedMembers, table);
    });
    selector.addEventListener("change", function () {
        selectedMembers = selectedFilter(data);
        mainTable(selectedMembers, table);
    });
}

/////////////ATENDANCE FUNCTIONS AND PARTY LOYALTY FUNCTIONS///////////////

var statistics = {

    numberOfDemocrats: 0,
    numberOfRepublicans: 0,
    numberOfIndependens: 0,

    votesWithPartyDem: 0,
    votesWithPartyRep: 0,
    votesWithPartyInd: 0,
}

function generalInfo(data) {
    var array = data.results["0"].members;
    var tbody = document.getElementById("statistics-data");

    var numOfDem = statistics.numberOfDemocrats;
    var numOfRep = statistics.numberOfRepublicans;
    var numOfInd = statistics.numberOfIndependens;

    var votDem = statistics.votesWithPartyDem;
    var votRep = statistics.votesWithPartyRep;
    var votInd = statistics.votesWithPartyInd;

    var arrRep = [];
    var arrDem = [];
    var arrInd = [];

    for (var i = 0; i < array.length; i++) {
        var votesPct = array[i].votes_with_party_pct;
        if (array[i].party == "D") {
            numOfDem++;
            votDem += parseFloat(votesPct);
            arrDem.push(votesPct);
        }
        if (array[i].party == "R") {
            numOfRep++;
            votRep += parseFloat(votesPct);
            arrRep.push(votesPct);
        }
        if (array[i].party == "I") {
            numOfInd++;
            votInd += parseFloat(votesPct);
            arrInd.push(votesPct);
        }
    }

    var avgDem = votDem / numOfDem;
    var avgRep = votRep / numOfRep;
    var avgInd = votInd / numOfInd;


    $(".dem-num").text(numOfDem);
    $(".rep-num").text(numOfRep);
    $(".ind-num").text(numOfInd);
    $(".dem-pct").text(avgDem.toFixed(2));
    $(".rep-pct").text(avgRep.toFixed(2));
    $(".ind-pct").text(avgInd.toFixed(2));


}

function leastEngaged(data) {
    var members = data.results["0"].members;
    var tbody = document.getElementById("least-engaged");
    var lessMembers = [];

    var sortedMembers = members.sort(function (a, b) {
        return parseFloat(a.missed_votes) > parseFloat(b.missed_votes) ? 1 : parseFloat(a.missed_votes) < parseFloat(b.missed_votes) ? -1 : 0;
    });

    for (i = 0; i < sortedMembers.length; i++) {
        if (i >= sortedMembers.length * 0.1) {
            if (sortedMembers[i - 1].missed_votes == sortedMembers[i].missed_votes) {
                lessMembers.push(sortedMembers[i].missed_votes);
            } else {
                break;
            }
        } else {
            lessMembers.push(sortedMembers[i].missed_votes);
        };
        var row = document.createElement("tr");
        var col = document.createElement("td");
        tbody.appendChild(row);

        var first_name = members[i].first_name;
        var midle_name = members[i].middle_name;
        var n = midle_name ? midle_name : "";
        var last_name = members[i].last_name;
        var name = first_name + " " + n + " " + last_name;
        var numMiss = members[i].missed_votes;
        var pctMiss = members[i].missed_votes_pct;

        row.insertCell().innerHTML = name;
        row.insertCell().innerHTML = numMiss;
        row.insertCell().innerHTML = pctMiss;
        tbody.append(row);
    }
    //    console.log(lessMembers);
}

function mostEngaged(data) {
    var members = data.results["0"].members;
    var tbody = document.getElementById("most-engaged");
    var lessMembers = [];

    var sortedMembers = members.sort(function (a, b) {
        return parseFloat(a.missed_votes) < parseFloat(b.missed_votes) ? 1 : parseFloat(a.missed_votes) > parseFloat(b.missed_votes) ? -1 : 0;
    });
    console.log(sortedMembers);

    for (i = 0; i < sortedMembers.length; i++) {
        if (i >= sortedMembers.length * 0.1) {
            if (sortedMembers[i - 1].missed_votes == sortedMembers[i].missed_votes) {
                lessMembers.push(sortedMembers[i].missed_votes);
            } else {
                break;
            }
        } else {
            lessMembers.push(sortedMembers[i].missed_votes);
        };
        var row = document.createElement("tr");
        var col = document.createElement("td");
        tbody.appendChild(row);

        var first_name = members[i].first_name;
        var midle_name = members[i].middle_name;
        var n = midle_name ? midle_name : "";
        var last_name = members[i].last_name;
        var name = first_name + " " + n + " " + last_name;
        var numMiss = members[i].missed_votes;
        var pctMiss = members[i].missed_votes_pct;

        row.insertCell().innerHTML = name;
        row.insertCell().innerHTML = numMiss;
        row.insertCell().innerHTML = pctMiss;
        tbody.append(row);
    }
    //    console.log(lessMembers);
}

function leastLoyal(data) {
    var members = data.results["0"].members;
    var tbody = document.getElementById("least-engaged");
    var lessMembers = [];

    var sortedMembers = members.sort(function (a, b) {
        return parseFloat(a.votes_with_party_pct) > parseFloat(b.votes_with_party_pct) ? 1 : parseFloat(a.votes_with_party_pct) < parseFloat(b.votes_with_party_pct) ? -1 : 0;
    });

    for (i = 0; i < sortedMembers.length; i++) {
        if (i >= sortedMembers.length * 0.1) {
            if (sortedMembers[i - 1].votes_with_party_pct == sortedMembers[i].votes_with_party_pct) {
                lessMembers.push(sortedMembers[i].votes_with_party_pct);
            } else {
                break;
            }
        } else {
            lessMembers.push(sortedMembers[i].votes_with_party_pct);
        };
        var row = document.createElement("tr");
        var col = document.createElement("td");
        tbody.appendChild(row);

        var first_name = members[i].first_name;
        var midle_name = members[i].middle_name;
        var n = midle_name ? midle_name : "";
        var last_name = members[i].last_name;
        var name = first_name + " " + n + " " + last_name;
        var numMiss = members[i].total_votes;
        var pctMiss = members[i].votes_with_party_pct;

        row.insertCell().innerHTML = name;
        row.insertCell().innerHTML = numMiss;
        row.insertCell().innerHTML = pctMiss;
        tbody.append(row);
    }
    //    console.log(lessMembers);
}

function mostLoyal(data) {
    var members = data.results["0"].members;
    var tbody = document.getElementById("most-engaged");
    var lessMembers = [];

    var sortedMembers = members.sort(function (a, b) {
        return parseFloat(a.votes_with_party_pct) < parseFloat(b.votes_with_party_pct) ? 1 : parseFloat(a.votes_with_party_pct) > parseFloat(b.votes_with_party_pct) ? -1 : 0;
    });
    console.log(sortedMembers);

    for (i = 0; i < sortedMembers.length; i++) {
        if (i >= sortedMembers.length * 0.1) {
            if (sortedMembers[i - 1].votes_with_party_pct == sortedMembers[i].votes_with_party_pct) {
                lessMembers.push(sortedMembers[i].votes_with_party_pct);
            } else {
                break;
            }
        } else {
            lessMembers.push(sortedMembers[i].votes_with_party_pct);
        };
        var row = document.createElement("tr");
        var col = document.createElement("td");
        tbody.appendChild(row);

        var first_name = members[i].first_name;
        var midle_name = members[i].middle_name;
        var n = midle_name ? midle_name : "";
        var last_name = members[i].last_name;
        var name = first_name + " " + n + " " + last_name;
        var numMiss = members[i].total_votes;
        var pctMiss = members[i].votes_with_party_pct;

        row.insertCell().innerHTML = name;
        row.insertCell().innerHTML = numMiss;
        row.insertCell().innerHTML = pctMiss;
        tbody.append(row);
    }
    //    console.log(lessMembers); 
}
