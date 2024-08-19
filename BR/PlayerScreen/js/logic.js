const relayIp = "ws://yabt.eu:2223";

let lastWinner = null;

function createUsers(name, scoresaberid) {
    for (let i = 0; i < scoresaberid.length; i++) {

        let playerDiv = document.getElementById("playerDivTemplate").cloneNode(true);
        fetch('https://new.scoresaber.com/api/player/' + scoresaberid[i] + '/full')
            .then(response => {
                return response.json()
            })
            .then(data => {

                let newPlayerPfp = playerDiv.getElementsByClassName("playerImage")[0];
                newPlayerPfp.src = "https://cdn.scoresaber.com/avatars/" + scoresaberid[i] + ".jpg";

                if (data.playerInfo.avatar == "/images/oculus.png") {
                    newPlayerPfp.src = "https://cdn.scoresaber.com/avatars/oculus.png";
                }
                if (data.playerInfo.avatar == "/images/steam.png") {
                    newPlayerPfp.src = "https://i.imgur.com/3KgARpG.png";
                }
            });

        let newPlayerText = playerDiv.getElementsByClassName("playerText")[0];
        newPlayerText.classList.add("playerText" + scoresaberid[i]);
        
        playerText = playerDiv.getElementsByClassName("playerText")[0];
        playerText.id = "playerText" + scoresaberid[i];

        let newPlayerImage = playerDiv.getElementsByClassName("playerImage")[0];
        newPlayerImage.classList.add("playerImage" + scoresaberid[i]);

        let newPlayerName = playerDiv.getElementsByClassName("playerName")[0];
        newPlayerName.classList.add("playerName" + scoresaberid[i]);
        newPlayerName.innerHTML = name[i];
        
        playerName = playerDiv.getElementsByClassName("playerName")[0];
        playerName.id = "playerName" + scoresaberid[i];

        let newPlayerScore = playerDiv.getElementsByClassName("playerScore")[0];
        newPlayerScore.classList.add("playerScore" + scoresaberid[i]);
        newPlayerScore.style.transition = "opacity 0.5s";
        
        playerScore = playerDiv.getElementsByClassName("playerScore")[0];
        playerScore.id = "playerScore" + scoresaberid[i];
        playerDiv.id = "playerDiv" + scoresaberid[i];
        playerDiv.style.transition = "block 0.5s";
        playerDiv.style.transition = "opacity 0.5s";
        playerDiv.style.display = "block";
        playerDiv.style.marginRight = "50px";
        playerDiv.style.marginTop = "5px";
        playerDiv.style.marginBottom = "25px";

        document.getElementById("Players").appendChild(playerDiv);
        document.getElementById("Players").style.opacity = "1";
    }
}

function updateUsers(PlayerId, score, alive) {
    if (alive == "true") {
        if (lastWinner != null) {
            document.getElementById(lastWinner).style.border = "3px #00000000 solid";
        }
        document.getElementsByClassName("playerScore" + PlayerId)[0].style.opacity = "0";
        document.getElementById("playerText" + PlayerId).style.border = "3px #48e227 solid";

        setTimeout(function() {
            document.getElementsByClassName("playerScore" + PlayerId)[0].innerHTML = score;
            document.getElementsByClassName("playerScore" + PlayerId)[0].style.opacity = "1";
        }, 1000);
        lastWinner = "playerText"+PlayerId;
    } else if (alive !== "true" || !alive) {
        document.getElementById("playerText" + PlayerId).style.opacity = "0.4";
        document.getElementById("playerText" + PlayerId).style.border = "3px #ae5252 solid";
    }
}

const ws = new WebSocket(relayIp);
ws.onopen = function() {
    console.log("Connected to Relay-server: " + relayIp);
};

ws.onmessage = async function(event) {
    jsonObj = JSON.parse(event.data);

    if (jsonObj.Type == 6) {
        if (jsonObj.command == "createUsers") {
            createUsers(jsonObj.PlayerNames, jsonObj.PlayerIds, jsonObj.order);
        } else if (jsonObj.command == "updateScore") {
            updateUsers(jsonObj.PlayerId, jsonObj.score, jsonObj.alive);
        } else if (jsonObj.command == "resetUsers") {
            document.getElementById("Players").style.opacity = "0";

            setTimeout(function() {
                $('#Players').empty();
            }, 1000);
        }
    }
};