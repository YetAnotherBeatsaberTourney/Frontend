function appendSongs(hash, diff, songName, name, modifiers) {
    if (modifiers == "undefined") {
        modifiers = "None";
    }

    let songs;

    if (tmconfig == 1) {
        songs = document.getElementById("currentMap");
    } else if (tmconfig == 2) {
        songs = document.getElementById("currentMapTeams");
    }
    const option = document.createElement("option");
    option.textContent = `${songName} | ${diff} | ${modifiers}`;
    option.value = hash;
    option.dataset.songName = songName;
    option.dataset.hash = diff;
    option.dataset.name = name;
    option.dataset.modifiers = modifiers;
    songs.appendChild(option);
}

function setPool(hashArray, diffArray, songNameArray, modifiers) {

    let songDiv;
    if (tmconfig == 1) {
        songDiv = document.getElementById("SongDivs");
    } else if (tmconfig == 2) {
        songDiv = document.getElementById("SongDivsTeams");
    }

    const songCircleTemplate = document.getElementById("SongCircle");

    hashArray.forEach((hash, index) => {
        const clone = songCircleTemplate.cloneNode(true);
        clone.classList.add(`SongCircle${hash}`);
        clone.setAttribute("onclick", `PB('${hash}_${diffArray[index]}_${modifiers[index]}')`);
        clone.setAttribute("data-hash", hash);
        clone.setAttribute("src", `https://eu.cdn.beatsaver.com/${hash.toLowerCase()}.jpg`);

        const diff = diffArray[index].toLowerCase();
        const title = `${songNameArray[index]} | ${diff} | ${modifiers[index]}`;
        const diffColor = getDiffColor(diff);
        const diffLabel = getDiffLabel(diff);

        clone.setAttribute("title", title);
        clone.setAttribute("data-title", songNameArray[index]);
        clone.setAttribute("data-diff", diffLabel);
        clone.setAttribute("data-modifiers", modifiers[index]);

        clone.style.boxShadow = `0px 0px 10px 0px ${diffColor}`;
        clone.style.background = diffColor;

        clone.style.display = "block";

        songDiv.appendChild(clone);
    });
}

function localPools() {
    Swal.fire({
        title: 'Upload your local pools',
        html: 'Please click on "Upload", upload your pools, and then confirm.',
        heightAuto: true,
        confirmButtonText: 'Confirm',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        footer: '<a href="./upload.php" target="blank"_>Upload.</a>'
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: "./pools/",
                success: function (data) {
                    $(data).find("a").attr("href", function (i, val) {
                        if (val.match(/\.bplist$/) || val.match(/\.json$/)) {
                            songOptions[val] = decodeURI(val).replace(/\.[^/.]+$/, "");
                            selectLocalMapPool();
                        }
                    });
                }
            });
        }
    });
};

function selectLocalMapPool() {
    Swal.fire({
        ...mapPoolNotifConf
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'Map pool selected!',
                html: 'You selected map pool<b>: ' + decodeURI(result.value).replace(/\.[^/.]+$/, "</b>"),
            });
            setSongJSON(result.value);

            document.getElementById("MATCHDIV").style.opacity = "0";
            setTimeout(function () {

                if (tmconfig == 1) {
                    document.getElementById("VERSUSDIV").style.display = "inline-block";
                } else if (tmconfig == 2) {
                    document.getElementById("PSDIV").style.display = "inline-block";
                }

                document.getElementById("MATCHDIV").style.display = "none";
                setTimeout(function () {
                    if (tmconfig == 1) {
                        document.getElementById("VERSUSDIV").style.opacity = "1";
                    } else if (tmconfig == 2) {
                        document.getElementById("PSDIV").style.opacity = "1";
                    }
                }, 1);
            }, 1);
        }
    })
};

function setSongJSON(playlist) {
    $.getJSON("./pools/" + playlist, function (data) {
        var songList = data.songs;
        var songHashes = [];
        for (var i = 0; i < songList.length; i++) {
            songHashes.push(songList[i].hash);
        }
        var diffNames = [];
        for (var i = 0; i < songList.length; i++) {
            console.log(songList[i].difficulties[0].name);
            diffNames.push(songList[i].difficulties[0].name);
        }
        var songNames = [];
        for (var i = 0; i < songList.length; i++) {
            songNames.push(songList[i].songName);
        }
        var songModifiers = [];
        for (var i = 0; i < songList.length; i++) {
            if (songList[i].modifiers) {
                songModifiers.push(songList[i].modifiers);
            }
        }

        ws.send(JSON.stringify({
            'Type': '5',
            'command': 'setPool',
            'songHash': songHashes,
            'songDiff': diffNames,
            'songModifiers': songModifiers,
        }));
        setPool(songHashes, diffNames, songNames, songModifiers);
    });
};

function BeatKhana() {
    Swal.fire({
        title: 'BeatKhana ID',
        input: 'number',
        inputPlaceholder: '2147484260',
        heightAuto: true,
        confirmButtonText: 'Confirm',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        footer: '<a  href="https://i.imgur.com/jDPd8WN.png" target="blank"_>How to find id?</a>',
        inputValidator: (value) => { return new Promise((resolve) => { if (value) { resolve() } else { resolve('You need to input something!'); } }) }
    }).then(function (result) {
        if (result.value) {
            checkForFiles(result.value);
        }
    });
}

function checkForFiles(id) {
    $.ajax({
        url: "https://beatkhana.com/api/tournament/" + id + "/map-pools",
        type: "GET",
        success: function (data) {
            var key = Object.keys(data);
            for (var i = 0; i < key.length; i++) {
                songOptions[data[key[i]].id] = data[key[i]].poolName;
                poolData.push(data[key[i]]);
                selectMapPool();
            }
        },
    });
}

function selectMapPool() {
    Swal.fire({
        ...mapPoolNotifConf
    }).then((result) => {
        if (result.value) {

            var pool = poolData.find(x => x.id == result.value);

            var songHashes = [];
            for (var i = 0; i < pool.songs.length; i++) {
                songHashes.push(pool.songs[i].hash);
            }
            var diffNames = [];
            for (var i = 0; i < pool.songs.length; i++) {
                diffNames.push(pool.songs[i].diff);
            }
            var songNames = [];
            for (var i = 0; i < pool.songs.length; i++) {
                songNames.push(pool.songs[i].name);
            }

            ws.send(JSON.stringify({
                'Type': '5',
                'command': 'setPool',
                'songHash': songHashes,
                'songDiff': diffNames
            }));
            setPool(songHashes, diffNames, songNames);
        }
        Swal.fire({
            title: 'Map pool selected!',
            html: 'You selected map pool<b>: ' + pool.poolName + '<br/>',
        });
        document.getElementById("MATCHDIV").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("VERSUSDIV").style.display = "inline-block";
            document.getElementById("MATCHDIV").style.display = "none";
            setTimeout(function () {
                document.getElementById("VERSUSDIV").style.opacity = "1";
            }, 1);
        }, 1);
    });
};