/* Handles formatting for time */

function fancyTimeFormat(duration) {
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function FormatText(string) {
    let inputString = string;
    const firstSpaceIndex = inputString.indexOf(" ");
    const firstWord = inputString.substring(0, firstSpaceIndex);
    const remainingText = inputString.substring(firstSpaceIndex);
    const outputString = `${firstWord} <span style="font-weight:600;">${remainingText}</span>`;
    return outputString;
}

function mapReplay(Actor) {
    if (Actor == 1) {
        p1Replay(false);
    }
    if (Actor == 2) {
        p2Replay(false);
    }
}

function resetReplays() {
    ReplayLeft = [1, 1];
    Replaying = [0, 0];

    document.getElementById("Player1Replay").style.opacity = "0";
    document.getElementById("Player1Replay").style.translate = "-150px";
    document.getElementById("Player2Replay").style.opacity = "0";
    document.getElementById("Player2Replay").style.translate = "150px";

    setTimeout(function () {
        document.getElementById("Player1Replay").innerText = "R";
        document.getElementById("Player1Replay").style.opacity = "1";
        document.getElementById("Player1Replay").style.translate = "0px";
        document.getElementById("Player2Replay").innerText = "R";
        document.getElementById("Player2Replay").style.opacity = "1";
        document.getElementById("Player2Replay").style.translate = "0px";
    }, 1000);
}

function p1Replay(mapChange) {
    if (ReplayLeft[0] === 1 && !mapChange) {
        ReplayLeft[0] = 0;
        Replaying[0] = 1;
        document.getElementById("Player1Replay").style.opacity = "0";
        document.getElementById("Player1Replay").style.translate = "-150px";

        setTimeout(function () {
            document.getElementById("Player1Replay").innerText = "REPLAY CALLED";
            document.getElementById("Player1Replay").style.opacity = "1";
            document.getElementById("Player1Replay").style.translate = "0px";
        }, 1000);
    } else if (ReplayLeft[0] == 0 && Replaying[0] == 1 && mapChange) {
        Replaying[0] = 0;
        document.getElementById("Player1Replay").style.opacity = "0";
        document.getElementById("Player1Replay").style.translate = "-150px";

        setTimeout(function () {
            document.getElementById("Player1Replay").innerText = "R";
            document.getElementById("Player1Replay").style.opacity = "0.4";
            document.getElementById("Player1Replay").style.translate = "0px";
        }, 1000);
    }
}
function p2Replay(mapChange) {
    if (ReplayLeft[1] === 1 && !mapChange) {
        ReplayLeft[1] = 0;
        Replaying[1] = 1;
        document.getElementById("Player2Replay").style.opacity = "0";
        document.getElementById("Player2Replay").style.translate = "150px";

        setTimeout(function () {
            document.getElementById("Player2Replay").innerText = "REPLAY CALLED";
            document.getElementById("Player2Replay").style.opacity = "1";
            document.getElementById("Player2Replay").style.translate = "0px";
        }, 1000);
    } else if (ReplayLeft[1] == 0 && Replaying[1] == 1 && mapChange) {
        Replaying[1] = 0;
        document.getElementById("Player2Replay").style.opacity = "0";
        document.getElementById("Player2Replay").style.translate = "150px";

        setTimeout(function () {
            document.getElementById("Player2Replay").innerText = "R";
            document.getElementById("Player2Replay").style.opacity = "0.4";
            document.getElementById("Player2Replay").style.translate = "0px";
        }, 1000);
    }
}

function changeScoreline(Score) {

    if (Score[0] != TeamScores[0]) {
        TeamScores[0] = Score[0];
        document.getElementById("Player1Score").innerText = Score[0];
    }

    if (Score[1] != TeamScores[1]) {
        TeamScores[1] = Score[1];
        document.getElementById("Player2Score").innerText = Score[1];
    }
}