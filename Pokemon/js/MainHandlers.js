const relayIp = "ws://localhost:2223";

//Player data
let teamNames = ["",""]
let teamCaptains = [null,null]
let players = [null,null];
let playerScore = [0, 0];
let playerAcc = [0.0, 0.0];
let playerCombo = [0, 0];
let playerMisses = [0, 0];
let playerFC = [true,true];
let revivesLeft = [1,1];
let replayLeft = [1, 1];
let replaying = [0, 0];
let scoreLine = [0, 0];

//Current song data
let songData = ["",0];

const ws = new WebSocket(relayIp);
ws.onopen = function () {
	console.log("Msg sent, connected");
};
ws.onmessage = async function (event) {
	jsonObj = JSON.parse(event.data);
	if (jsonObj.Type == 3) // LevelChanged
	{
		if (jsonObj.command == "updateMap") {
			
			getMap(jsonObj.LevelId, jsonObj.Diff, jsonObj.Modifiers, jsonObj.Player);
			scoreUpdate(0, 0, 0, 0, 0, 1);
			p1Replay(true);
			p2Replay(true);
		}
	}
	if (jsonObj.Type == 4) // Score Update
	{
		const data = jsonObj.message;
		scoreUpdate(data.user_id, data.score, data.combo, data.accuracy * 100, data.totalMisses);
	}
	if (jsonObj.Type == 5) {
		if (jsonObj.command == "createUsers" && jsonObj.matchStyle == "PS") {
			teamCaptains = [jsonObj.Teams[0].captain, jsonObj.Teams[1].captain];
			players = [jsonObj.Teams[0].players, jsonObj.Teams[1].players];
			teamNames = [jsonObj.Teams[0].name, jsonObj.Teams[1].name];
			teamImages = [jsonObj.Teams[0].image, jsonObj.Teams[1].image];
			setOverlay(teamCaptains, players, teamNames, jsonObj.Round);
		}
		if (jsonObj.command == "updateScore") {
			changeScoreline(jsonObj.Score);
		}
		if (jsonObj.command === "mapReplay") {
			mapReplay(jsonObj.Actor);
		}
		if (jsonObj.command == "resetOverlay") {
			document.getElementById("SongCard").style.opacity = 0;
			document.getElementById("PlayerContainers").style.opacity = 0;
			document.getElementById("TugOfWar").style.opacity = 0;
			document.getElementById("TextBox").style.opacity = 0;

			setTimeout(function () {
				scoreUpdate(0, 0, 0, 0, 0, 1);
				resetReplays();
				changeScoreline([0,0]);
				songData["",0];
			}, 1000);
		}
	}
};
