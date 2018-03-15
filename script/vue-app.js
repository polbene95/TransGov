var app = new Vue({

    el: "#app",
    data: {
        url: "https://nytimes-ubiqum.herokuapp.com/congress/113/house",
        members: [],
        states: [],
        allMembers: [],
        canShowAdvice: false,
        mainTable: [],
    },
    created: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            $.getJSON(this.url, function (data) {
                app.members = data.results[0].members;
                app.allMembers = app.members;
                app.statesArray();
                app.canShowAdvice = true;

            });

        },
        fetchJson : function (urls) {
            return Promise.all(urls).map(url => this.getData(url));
        },
        statesArray: function () {
            var allStates = $(this.members).map(function () {
                return this.state;
            });
            var sortedStates = allStates.sort();
            this.states = Array.from(jQuery.unique(sortedStates));
        },
        filter: function () {
            this.members = this.allMembers;
            var checkboxes = $("input[name=party]:checked").map(function () {
                return this.value;
            }).get();
            var resultMembers = this.members.filter(function (member) {
                var filter1 = checkboxes.includes(member.party)
                var filter2 = member.state == $("#states").val() || $("#states").val() == "all";
                return filter1 && filter2;
            })
            this.members = resultMembers;
        },
        fillTable1: function () {
            var numDem = 0;
            var numRep = 0;
            var numInd = 0;
            var numTotal = 0;
            var avgDem = 0;
            var avgRep = 0;
            var avgInd = 0;
            var avgTotal = 0;
            
            var allRep = $(this.members).map(function () {
                var party = this.party;
                var votesPct = this.votes_with_party_pct;
                if (party == "R") {
                    numRep += 1;
                    avgRep += votesPct
                }
                if (party == "D") {
                    numDem += 1;
                    avgDem += votesPc
                }
                if (party == "I") {
                    numInd += 1;
                    avgInd += votesPc
                }
                numTotal += 1;
                avgTotal += votesPct;
            });

        }
    }
});