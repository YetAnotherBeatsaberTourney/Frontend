const debug = true;
const relayIp = "wss://api.danesaber.cf:2224";

let ws;
let usernames;
let P1;
let P2;
let P1Name;
let P2Name;
let userids;
let twitchnames;
let inMatch = false;
let matchId;
let tmconfig = 0;
let PlayerInfo = [];
let songOptions = [];
let specUsername;
let specTwitchname;
let ACCGoal = 0;

function openWebSocket(val) {
    ws = new WebSocket(relayIp);
    ws.onclose = function () {
        swal.close();
        Swal.fire({
            title: 'WebSocket <b>closed</b>!',
            html: 'Contact Hawk on Discord.'
        })
        //set reconnect to opacity 1
        document.getElementById("reconnect").style.opacity = "1";
    }
    ws.onopen = function () {
        if (!inMatch) {
        checkForFiles();
        configPop();
        }
        if (debug) {
            console.log("Connected to Relay-server: " + relayIp);
        }
        if (val == 1) {
            Notiflix.Notify.success("Websocket reconnected", { plainText: false, clickToClose: true, timeout: 5000, position: 'right-bottom' });
            document.getElementById("reconnect").style.opacity = "0";
        }
    }
    ws.onerror = function (event) {
        //Close all swal popups
        swal.close();
        Swal.fire({
            title: 'WebSocket <b>timed out</b>!',
            html: 'Contact Hawk on Discord.'
        })
        document.getElementById("reconnect").style.opacity = "1";
    }
} openWebSocket(0);

function setPool(hash, diff, songName) {
    //Create clones of the song circle and add them to the SongsDivs div
    for (var i = 0; i < hash.length; i++) {
        var clone = document.getElementById("SongCircle").cloneNode(true);

        clone.classList.add("SongCircle" + hash[i]);
        clone.setAttribute("onclick", "PB('" + hash[i] + "_" + diff[i] + "')");
        clone.setAttribute("data-price", hash[i]);
        clone.setAttribute("src", "https://eu.cdn.beatsaver.com/" + hash[i].toLowerCase() + ".jpg");

        switch (diff[i].toLowerCase()) {
            case "easy":
                var diffColor = "#008055";
                break;
            case "normal":
                var diffColor = "#1268A1";
                break;
            case "hard":
                var diffColor = "#BD5500";
                break;
            case "expert":
                var diffColor = "#B52A1C";
                break;
            case "expertplus":
                var diffColor = "#454088";
                break;
            default:
                var diffColor = "#000000";
                break;
        }
        //Set title of the song circle to the song name
        clone.setAttribute("title", songName[i]);
        clone.style.boxShadow = "0px 0px 10px 0px " + diffColor;
        clone.style.background = diffColor;

        //Set SongCircle+hash[i] to display block
        clone.style.display = "block";

        document.getElementById("SongDivs").appendChild(clone);
    }
}

function setSongJSON(playlist) {
    //AJAX Get ./pools/pool1.json and parse as JSON
    $.getJSON("./pools/" + playlist, function (data) {
        //Get the song list from the JSON
        var songList = data.songs;
        //Create a new array to store the song names
        var songHashes = [];
        //Loop through the song list and add the song names to the array
        for (var i = 0; i < songList.length; i++) {
            songHashes.push(songList[i].hash);
        }
        //Loop through the songlist and store the diff names in an array
        var diffNames = [];
        for (var i = 0; i < songList.length; i++) {
            diffNames.push(songList[i].difficulties[0].name);
        }
        //loop through songs to get songName
        var songNames = [];
        for (var i = 0; i < songList.length; i++) {
            songNames.push(songList[i].songName);
        }
        console.log(songHashes + " | " + diffNames);
        ws.send(JSON.stringify({ 'Type': '5', 'command': 'setPool', 'songHash': songHashes, 'songDiff': diffNames }));
        setPool(songHashes, diffNames, songNames);
    });
}

function PB(hashdiff) {
    let hash = hashdiff.split("_")[0];
    let diff = hashdiff.split("_")[1];

    //Get title from img with data-price attribute equal to hash
    let title = document.querySelector(`img[data-price="${hash}"]`).getAttribute("title");

    Swal.fire({
        title: 'Who\'s picking?',
        showDenyButton: true,
        showDenyButton: true,
        confirmButtonText: P1Name,
        denyButtonText: P2Name,
        cancelButtonText: `Tiebreaker`,
        confirmButtonColor: '#ff5252',
        denyButtonColor: '#a768eb',
        cancelButtonColor: '#464646',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let data = [hash, P1];
            Swal.fire({
                title: 'Pick or Ban?',
                showDenyButton: true,
                showDenyButton: true,
                confirmButtonText: `Pick`,
                denyButtonText: `Ban`,
                cancelButtonText: `Back`,
                confirmButtonColor: '#439555',
                denyButtonColor: '#eb6868',
                cancelButtonColor: '#464646',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    console.log("Added " + title + " to the current map list." + " | " + diff + " | " + P1Name);
                    ws.send(JSON.stringify({ "Type": "5", "command": "PicksAndBans", "Action": "Pick", "map": hash, "PlayerId": P1 }));
                    //Send ws message
                    appendSongs(hash, diff, title, P1Name);

                } else if (result.isDenied) {
                    if (debug) {
                        console.log(P1Name + "(" + P1 + ") banned " + hash);
                    }
                    ws.send(JSON.stringify({ "Type": "5", "command": "PicksAndBans", "Action": "Ban", "map": hash, "PlayerId": P1 }));
                } else if (result.isDismissed) {
                    //Go back to the previous menu
                    PB(hashdiff);
                }
            });
        } else if (result.isDenied) {
            let data = [hash, P2];
            Swal.fire({
                title: 'Pick or Ban?',
                showDenyButton: true,
                showDenyButton: true,
                confirmButtonText: `Pick`,
                denyButtonText: `Ban`,
                cancelButtonText: `Back`,
                confirmButtonColor: '#439555',
                denyButtonColor: '#eb6868',
                cancelButtonColor: '#464646',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    console.log("Added " + title + " to the current map list." + " | " + diff + " | " + P2Name);
                    ws.send(JSON.stringify({ "Type": "5", "command": "PicksAndBans", "Action": "Pick", "map": hash, "PlayerId": P2 }));
                    appendSongs(hash, diff, title, P2Name);
                } else if (result.isDenied) {
                    if (debug) {
                        console.log(P2Name + "(" + P2 + ") banned " + hash);
                    }
                    ws.send(JSON.stringify({ "Type": "5", "command": "PicksAndBans", "Action": "Ban", "map": hash, "PlayerId": P2 }));
                    //Remove hash from currentMap selection
                } else if (result.isDismissed) {
                    //Go back to the previous menu
                    PB(hashdiff);
                }
            });
        } else if (result.isDismissed) {
            let data = [hash, "Tiebreaker"];
            ws.send(JSON.stringify({ "Type": "5", "command": "PicksAndBans", "Action": "Tiebreaker", "map": hash, "PlayerId": "0" }));
            appendSongs(hash, diff, title, "Tiebreaker");
        }
    });
}

function checkForFiles() {
    console.log("Checking for files pool-files.");
    $.ajax({
        url: "./pools/",
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.bplist$/) || val.match(/\.json$/)) {
                    //Set value in select box to the filename and title to the filename without extension
                    songOptions[val] = decodeURI(val).replace(/\.[^/.]+$/, "");
                }
            });
        }
    });
}

const inputOptions = new Promise((resolve) => {
    resolve({
        '1': '1V1',
        '2': 'Battle Royale'
    })
})

const boOptions = new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9'
        })
    }, 1000)
})

function configPop() {
    const { value: tmstyle } = Swal.fire({
        title: 'Select tournament style.',
        input: 'radio',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!'
            } else {
                tmconfig = value;
                switch (value) {
                    case "1":
                        tmconfig = 1;
                        title = "1V1";
                        break;
                    case "2":
                        tmconfig = 2;
                        title = "Battle Royale";
                        break;
                }
                if (debug) {
                    console.log(value);
                }
                if (value) {
                    return new Promise((resolve) => {
                        let timerInterval
                        Swal.fire({
                            title: 'You\'re connected!',
                            html: 'You\'ve selected <b>' + title + '</b>, as tournament style.<br/>',
                            timer: 5000,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval)

                                if (tmconfig == 1) {
                                    //Set the opacity and display of MATCHDIV to 1 and revert
                                    document.getElementById("MATCHDIV").style.display = "inline-block";
                                    //Delay for 1 second
                                    setTimeout(function () {
                                        document.getElementById("MATCHDIV").style.opacity = "1";
                                    }, 1);
                                }
                                if (tmconfig == 2) {
                                    //Set the opacity and display of MATCHDIV to 1 and revert
                                    configure();
                                }
                            }
                        });
                    })
                }
            }
        }
    })
};

function selectMapPool() {
    //Create a Sweetalert with a select box
    Swal.fire({
        title: 'Select a map pool',
        input: 'select',
        inputOptions: songOptions,
        inputPlaceholder: 'Select a map pool',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        footer: '<a href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value) {
                    resolve()
                } else {
                    resolve('You need to select something!');
                }
            }
            )
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'Map pool selected!',
                html: 'You selected map pool<b>: ' + decodeURI(result.value).replace(/\.[^/.]+$/, "</b>"),
            });
            setSongJSON(result.value);
            document.getElementById("MATCHDIV").style.opacity = "0";
            setTimeout(function () {
                document.getElementById("VERSUSDIV").style.display = "inline-block";
                document.getElementById("MATCHDIV").style.display = "none";
                setTimeout(function () {
                    document.getElementById("VERSUSDIV").style.opacity = "1";
                }, 1);
            }, 1);
        }
    })
};

function appendSongs(hash, diff, name, player) {
    var songs = document.getElementById("currentMap");
    var el = document.createElement("option");
    el.textContent = name + " | " + diff;
    el.value = hash;
    el.setAttribute("data-songName", name);
    el.setAttribute("data-price", diff);
    el.setAttribute("data-player", player);
    songs.appendChild(el);
}

function addUsernames(usernames, userids, twitchnames) {
    var select1 = document.getElementById("playerScreenNames");
    var select2 = document.getElementById("playerSpectatingNames");
    for (var i = 0; i < usernames.length; i++) {
        var opt = usernames[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = userids[i];
        select1.appendChild(el);
        var ell = document.createElement("option");
        ell.textContent = opt;
        ell.value = twitchnames[i];
        select2.appendChild(ell);
    }
    ws.send(JSON.stringify({ 'Type': '7', 'count': usernames.length }));
}

function reset() {
    if (inMatch) {
        if (tmconfig == 1) {
            ws.send(JSON.stringify({ 'Type': '5', 'command': 'resetOverlay' }));
            inMatch = false;
            location.reload();
        } else if (tmconfig == 2) {
            ws.send(JSON.stringify({ 'Type': '6', 'command': 'resetUsers' }));
            ws.send(JSON.stringify({ 'Type': '6', 'command': 'resetSpectator' }));
            inMatch = false;
            location.reload();
        }
    }
}

function reload() {
    if (inMatch) {
        if (tmconfig == 1) {
        ws.send(JSON.stringify({ 'Type': '5', 'command': 'createUsers', 'PlayerNames': [PlayerInfo[0][0], PlayerInfo[1][0]], 'PlayerIds': [P1, P2], 'TwitchIds': [PlayerInfo[0][1], PlayerInfo[1][1]], 'BestOf': bestOf }));
        } else if (tmconfig == 2) {
            //Remove all entries from playerScreenNames and playerSpectatingNames expect the first one
            var select1 = document.getElementById("playerScreenNames");
            var select2 = document.getElementById("playerSpectatingNames");
            for (var i = select1.options.length - 1; i >= 1; i--) {
                select1.remove(i);
            }
            for (var i = select2.options.length - 1; i >= 1; i--) {
                select2.remove(i);
            }
            document.getElementById("score").value = "";
            document.getElementById("playerScreenNames").selectedIndex = 0;
            document.getElementById("playerSpectatingNames").selectedIndex = 0;
            document.getElementById("alive").selectedIndex = 0;
        addUsernames(usernames, userids, twitchnames);
        ws.send(JSON.stringify({ 'Type': '6', 'command': 'createUsers', 'PlayerNames': usernames, 'PlayerIds': userids, 'order': usernames.length }));
        ws.send(JSON.stringify({ 'Type': '6', 'command': 'updateSpectator','Player':specUsername,'Twitch':specTwitchname,'ACCGoal': ACCGoal}));
        }
    }
}

function reconnect() {
    openWebSocket(1);
}

function configure() {
    if (!inMatch) {
        if (!tmconfig) {
            Swal.fire({
                title: 'No tournament style selected!',
                html: 'Please select a tournament style, before configuring the overlay.',
                confirmButtonText: 'Setup'
            }).then(function (result) {
                if (result.isConfirmed) {
                    configPop();
                }
            })
        } else if (tmconfig == 1) {
            Swal.fire({
                title: 'Player 1 Info',
                input: 'textarea',
                inputPlaceholder: 'Username\nTwitch Name',
                heightAuto: true,
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Confirm',
                footer: '<a href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>',
                inputValidator: (value) => { return new Promise((resolve) => { if (value) { resolve() } else { resolve('You need to input something!'); } }) }
            }).then(function (result) {
                if (result.value) {
                    PlayerInfo.push(result.value.split("\n"));
                    Swal.fire({
                        title: 'Player 2 Info',
                        input: 'textarea',
                        inputPlaceholder: 'Username\nTwitch Name',
                        heightAuto: true,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: 'Confirm',
                        footer: '<a  href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>',
                        inputValidator: (value) => { return new Promise((resolve) => { if (value) { resolve() } else { resolve('You need to input something!'); } }) }
                    }).then(function (result) {
                        if (result.value) {
                            PlayerInfo.push(result.value.split("\n"));
                            Swal.fire({
                                title: 'Best of',
                                input: 'radio',
                                inputOptions: boOptions,
                                heightAuto: true,
                                showCancelButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Confirm',
                                footer: '<a  href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>',
                                inputValidator: (value) => { return new Promise((resolve) => { if (value) { resolve() } else { resolve('You need to input something!'); } }) }
                            }).then(function (result) {
                                if (result.value) {
                                    PlayerInfo.push(result.value.split("\n"));
                                    bestOf = result.value;
                                    if (debug) {
                                        console.log("Player 1 | Name: " + PlayerInfo[0][0] + " | Twitch ID: " + PlayerInfo[0][1]);
                                        console.log("Player 2 | Name: " + PlayerInfo[1][0] + " | Twitch ID: " + PlayerInfo[1][1]);
                                    }

                                    P1Name = PlayerInfo[0][0];
                                    P2Name = PlayerInfo[1][0];

                                    document.getElementById("playerScore").removeAttribute("disabled");
                                    document.getElementById("P1ScoreSlider").removeAttribute("disabled");
                                    document.getElementById("P2ScoreSlider").removeAttribute("disabled");
                                    document.getElementById("currentMap").removeAttribute("disabled");
                                    document.getElementById("mapPlaying").removeAttribute("disabled");
                                    document.getElementById("P1ScoreSlider").max = bestOf;
                                    document.getElementById("P2ScoreSlider").max = bestOf;
                                    document.getElementById("P1Name").innerHTML = PlayerInfo[0][0] + "'s score";
                                    document.getElementById("P2Name").innerHTML = PlayerInfo[1][0] + "'s score";
                                    inMatch = true;
                                    ws.send(JSON.stringify({ 'Type': '5', 'command': 'createUsers', 'PlayerNames': [PlayerInfo[0][0], PlayerInfo[1][0]], 'PlayerIds': [P1, P2], 'TwitchIds': [PlayerInfo[0][1], PlayerInfo[1][1]], 'BestOf': bestOf }));
                                    selectMapPool();
                                }
                            })
                        }
                    })
                }
            })
        } else if (tmconfig == 2) {
            Swal.fire({
                title: 'Complete list of usernames',
                input: 'textarea',
                heightAuto: true,
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Confirm',
                footer: '<a  href="https://api.danesaber.cf/r/guideBR" target="blank"_>How to do this.</a>',
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value) {
                            resolve()
                        } else {
                            resolve('You need to input something!');
                        }
                    })
                }
            }).then(function (result) {
                if (result.value) {
                    usernames = result.value.split("\n");

                    Swal.fire({
                        title: 'Complete list of userids',
                        input: 'textarea',
                        heightAuto: true,
                        showCancelButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: 'Confirm',
                        footer: '<a  href="https://api.danesaber.cf/r/guideBR" target="blank"_>How to do this.</a>',
                        inputValidator: (value) => {
                            return new Promise((resolve) => {
                                if (value) {
                                    resolve()
                                } else {
                                    resolve('You need to input something!');
                                }
                            })
                        }
                    }).then(function (result) {
                        if (result.value) {
                            userids = result.value.split("\n");

                            Swal.fire({
                                title: 'Complete list of Twitchnames',
                                input: 'textarea',
                                heightAuto: true,
                                showCancelButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Confirm',
                                footer: '<a  href="https://api.danesaber.cf/r/guideBR" target="blank"_>How to do this.</a>',
                                inputValidator: (value) => {
                                    return new Promise((resolve) => {
                                        if (value) {
                                            resolve()
                                        } else {
                                            resolve('You need to input something!');
                                        }
                                    })
                                }
                            }).then(function (result) {
                                if (result.value) {
                                    twitchnames = result.value.split("\n");

                                    addUsernames(usernames, userids, twitchnames);

                                    document.getElementById("playerScreenNames").removeAttribute("disabled");
                                    document.getElementById("playerSpectatingNames").removeAttribute("disabled");
                                    document.getElementById("ACCGoal").removeAttribute("disabled");
                                    document.getElementById("score").removeAttribute("disabled");
                                    document.getElementById("alive").removeAttribute("disabled");
                                    document.getElementById("playerScreen").removeAttribute("disabled");
                                    document.getElementById("playerSpec").removeAttribute("disabled");
                                    document.getElementById("playerResetSpec").removeAttribute("disabled");
                                    document.getElementById("BRDIV").style.display = "inline-block";

                                    setTimeout(function () {
                                        document.getElementById("BRDIV").style.opacity = "1";
                                    }, 1000);
                                    inMatch = true;
                                    ws.send(JSON.stringify({ 'Type': '6', 'command': 'createUsers', 'PlayerNames': usernames, 'PlayerIds': userids, 'order': usernames.length }));
                                }
                            });
                        }
                    });
                }
            })
        }
    }
}