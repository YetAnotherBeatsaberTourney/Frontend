const relayIp = "wss://api.danesaber.cf:2224";

let P1;
let P1Name;
let P1Acc;
let P1Score = 0;
let P1Fc = true;

let P2;
let P2Name;
let P2Acc;
let P2Score = 0;
let P2Fc = true;

let matchId;

let currentSong;
let currentDiff;
let songLength = [0,0];

let pointAmountL; //Point amount upper
let pointAmountU; //Point amount lower

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

//Set the user profile pictures
async function setOverlay(P1, P1Name, P2, P2Name) {
	fetch('https://new.scoresaber.com/api/player/' + P1 + '/basic', { headers: { 'Access-Control-Request-Headers': 'x-requested-with' } })
		.then(response => response.json())
		.then(data => {
			if (data.playerInfo.avatar == "/images/oculus.png") {
				document.getElementById("Player1Image").src = "https://new.scoresaber.com/api/static/avatars/oculus.png";
			} else {
				document.getElementById("Player1Image").src = "https://new.scoresaber.com/api/static/avatars/" + P1 + ".jpg";
			}
			document.getElementById("Player1Name").innerText = P1Name;
			document.getElementById("Player1Rank").innerText = '#' + data.playerInfo.rank + ' Global | #' + data.playerInfo.countryRank + ' ' + data.playerInfo.country;
			document.getElementById("Player1Name").style.opacity = '1';
			document.getElementById("Player1Rank").style.opacity = '0.6';
		});
	fetch('https://new.scoresaber.com/api/player/' + P2 + '/basic', { headers: { 'Access-Control-Request-Headers': 'x-requested-with' } })
		.then(response => response.json())
		.then(data => {
			if (data.playerInfo.avatar == "/images/oculus.png") {
				document.getElementById("Player2Image").src = "https://new.scoresaber.com/api/static/avatars/oculus.png";
			} else {
				document.getElementById("Player2Image").src = "https://new.scoresaber.com/api/static/avatars/" + P2 + ".jpg";
			}
			document.getElementById("Player2Name").innerText = P2Name;
			document.getElementById("Player2Rank").innerText = '#' + data.playerInfo.rank + ' Global | #' + data.playerInfo.countryRank + ' ' + data.playerInfo.country;
			document.getElementById("Player2Name").style.opacity = '1';
			document.getElementById("Player2Rank").style.opacity = '0.6';
		});

	setTimeout(function () {
		document.getElementById("PlayerBounds").style.opacity = '1';
		document.getElementById("PlayerContainers").style.opacity = '1';
		document.getElementById("leftPoints").style.opacity = '1';
		document.getElementById("rightPoints").style.opacity = '1';
	}, 1000);
}

async function getMap(LevelId, LevelDiff, Player) {
	let songHash = LevelId.replace("custom_level_", "");
	let songDiff = LevelDiff;

	switch (songDiff) {
		case 0:
			var diffText = "Easy";
			var diffColor = "#008055";
			break;
		case 1:
			var diffText = "Normal";
			var diffColor = "#1268A1";
			break;
		case 2:
			var diffText = "Hard";
			var diffColor = "#BD5500";
			break;
		case 3:
			var diffText = "Expert";
			var diffColor = "#B52A1C";
			break;
		case 4:
			var diffText = "Expert+";
			var diffColor = "#454088";
			break;
	}
	if (currentSong != songHash) {
		currentSong = songHash;
		currentDiff = songDiff;
		console.log(currentSong + " " + currentDiff);

		fetch('https://api.beatsaver.com/maps/hash/' + songHash)
			.then(response => response.json())
			.then(data => {
				document.getElementById("SongBox").style.opacity = "0";
				songLength = [0, data.metadata.duration];
				setTimeout(function () {
					document.getElementById("SongCover").style.background = 'url(https://eu.cdn.beatsaver.com/' + songHash.toLowerCase() + '.jpg)';
					document.getElementById("SongCover").style.backgroundSize = 'cover';
					document.getElementById("SongCover").style.borderColor = diffColor;
					document.getElementById("SongInfo").style.borderColor = diffColor;
					document.getElementById("DiffTag").style.background = diffColor;
					document.getElementById("SongTitle").innerHTML = data.metadata.songName;
					document.getElementById("SongMapper").innerHTML = data.metadata.levelAuthorName;
					document.getElementById("SongArtist").innerHTML = data.metadata.songAuthorName;
					document.getElementById("SongKey").innerHTML = data.id;
					document.getElementById("DiffText").innerHTML = diffText;
					document.getElementById("SongLength").innerHTML = fancyTimeFormat(0)+" / "+fancyTimeFormat(songLength[1]);
					if (Player == "Tiebreaker") {
						document.getElementById("SongPick").innerHTML = "Picked as tiebreaker";
					} else {
						document.getElementById("SongPick").innerHTML = "Picked by " + Player;
					}
					document.getElementById("SongBox").style.opacity = "1";

				}, 2000);
			});
	} else if (currentSong == songHash && currentDiff != songDiff) {
		currentDiff = songDiff;
		document.getElementById("DiffText").style.opacity = "0";
		document.getElementById("SongLength").style.opacity = "0";
		setTimeout(function () {
			document.getElementById("SongLength").innerHTML = fancyTimeFormat(0)+" / "+fancyTimeFormat(songLength[1]);
			document.getElementById("DiffText").innerHTML = diffText;
			document.getElementById("DiffText").style.opacity = "1";
			document.getElementById("SongLength").style.opacity = "1";

		}, 1000);
		document.getElementById("DiffTag").style.background = diffColor;
		document.getElementById("SongCover").style.borderColor = diffColor;
		document.getElementById("SongInfo").style.borderColor = diffColor;
	}
}

function scoreUpdate(player, score, combo, acc, misses, combined, badCuts, bombHits, wallHits, reset) {

	if (P1 == player) {
		P1Acc = acc.toFixed(2);
		document.getElementById("Player1Combo").innerHTML = combo + "x";
		document.getElementById("Player1ACC").innerHTML = P1Acc + "%";
		if (misses >= 1) {

			document.getElementById("Player1FC").style.color = "#d15252";
			document.getElementById("Player1FC").innerHTML = misses + "x";
			if (P1Fc) {
				P1Fc = false;
			}
		}
		if (misses == 0) {
			P1Fc = true;
			document.getElementById("Player1FC").style.color = "#ffffff";
			document.getElementById("Player1FC").innerHTML = "FC";
		}
		if (reset) {
			P1Fc = true;
			document.getElementById("Player1FC").style.color = "#ffffff";
			document.getElementById("Player1FC").innerHTML = "FC";
		}
	}
	if (P2 == player) {
		P2Acc = acc.toFixed(2);
		document.getElementById("Player2Combo").innerHTML = combo + "x";
		document.getElementById("Player2ACC").innerHTML = P2Acc + "%";
		if (misses >= 1) {
			document.getElementById("Player2FC").style.color = "#d15252";
			document.getElementById("Player2FC").innerHTML = misses + "x";
			if (P2Fc) {
				P2Fc = false;
			}
		}
		if (misses == 0) {
			P2Fc = true;
			document.getElementById("Player2FC").style.color = "#ffffff";
			document.getElementById("Player2FC").innerHTML = "FC";
		}
		if (reset) {
			P2Fc = true;
			document.getElementById("Player2FC").style.color = "#ffffff";
			document.getElementById("Player2FC").innerHTML = "FC";
		}
	}
}
function toFixed(num, fixed) {
	let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || +2) + '})?');
	return num.toString().match(re)[0];
}

function songPos(matchIds) {

	if (matchIds == matchId) {
		songLength[0] = songLength[0]+1;
		var interval = setInterval(function () {
			songLength[0] = songLength[0] + 1;
			document.getElementById("SongLength").innerHTML = fancyTimeFormat(songLength[0])+" / "+fancyTimeFormat(songLength[1]);
			if (songLength[0] >= songLength[1]) {
				clearInterval(interval);
			}
		}, 1000);
	}
}

function setBestOf(n) {
	//Turn above into a switch case
	setTimeout(function () {
		switch (n) {
			case "1":
				console.log("Best of 1");
				pointAmountL = 1;
				pointAmountU = 0;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "2":
				console.log("Best of 2");
				pointAmountL = 1;
				pointAmountU = 1;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "3":
				console.log("Best of 3");
				pointAmountL = 2;
				pointAmountU = 1;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "4":
				console.log("Best of 4");
				pointAmountL = 2;
				pointAmountU = 2;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "5":
				console.log("Best of 5");
				pointAmountL = 3;
				pointAmountU = 2;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "6":
				console.log("Best of 6");
				pointAmountL = 3;
				pointAmountU = 3;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "7":
				console.log("Best of 7");
				pointAmountL = 4;
				pointAmountU = 3;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "8":
				console.log("Best of 8");
				pointAmountL = 4;
				pointAmountU = 4;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			case "9":
				console.log("Best of 9");
				pointAmountL = 5;
				pointAmountU = 4;
				for (i = 1; i <= pointAmountL; i++) {
					document.getElementById("ll" + i).style.opacity = "1";
					document.getElementById("rl" + i).style.opacity = "1";
				}
				for (i = 1; i <= pointAmountU; i++) {
					document.getElementById("lu" + i).style.opacity = "1";
					document.getElementById("ru" + i).style.opacity = "1";
				}
				break;
			default:
				break;
		}
	}, 1000);

}

const ws = new WebSocket(relayIp);
ws.onopen = function () {
	console.log("Msg sent, connected");
};
ws.onmessage = async function (event) {
	jsonObj = JSON.parse(event.data);
	if (jsonObj.Type == 3) // LevelChanged
	{
		if (jsonObj.overlay == "1V1") {
			if (jsonObj.matchId == matchId) {
				var LevelId = jsonObj.LevelId;
				var Diff = jsonObj.Diff;
				var Player = jsonObj.Player;
				getMap(LevelId, Diff, Player);
				scoreUpdate(P1, 0, 0, 0, 0, 0, 0, 0, 0, 1);
				scoreUpdate(P2, 0, 0, 0, 0, 0, 0, 0, 0, 1);
			}
		}
	}
	if (jsonObj.Type == 4) // Score Update
	{
		scoreUpdate(jsonObj.message.user_id, jsonObj.message.score, jsonObj.message.combo, jsonObj.message.accuracy * 100, jsonObj.message.totalMisses, jsonObj.message.notesMissed, jsonObj.message.badCuts, jsonObj.message.bombHits, jsonObj.message.wallHits);
		songPos(jsonObj.message.matchId);
	}

	if (jsonObj.Type == 5) { //Match Created
		if (jsonObj.command == "createUsers") {
			matchId = jsonObj.MatchId;
			P1 = jsonObj.PlayerIds[0];
			P2 = jsonObj.PlayerIds[1];
			setBestOf(jsonObj.BestOf);
			setOverlay(jsonObj.PlayerIds[0], jsonObj.PlayerNames[0], jsonObj.PlayerIds[1], jsonObj.PlayerNames[1]);
		}
		if (jsonObj.command == "updateScore") {
			//Look in ScoreLogic.js for this behemoth... :fearful:
			changeScoreline(jsonObj.PlayerIds, jsonObj.Score);
		}
		if (jsonObj.command == "resetOverlay") {

			document.getElementById("SongBox").style.opacity = "0";
			document.getElementById("PlayerBounds").style.opacity = "0";
			document.getElementById("PlayerContainers").style.opacity = '0';

			currentDiff = "";
			currentSong = "";

			document.getElementById("leftPoints").style.opacity = '0';
			document.getElementById("rightPoints").style.opacity = '0';

			setTimeout(function () {
				scoreUpdate(P1, 0, 0, 0, 0, 0, 0, 0, 0, 1);
				scoreUpdate(P2, 0, 0, 0, 0, 0, 0, 0, 0, 1);
				P1Score = 0;
				P2Score = 0;

				document.getElementById("Player1Name").innerText = "";
				document.getElementById("Player1Rank").innerText = '#0 Global | #0 NaN';
				document.getElementById("Player2Name").innerText = "";
				document.getElementById("Player2Rank").innerText = '#0 Global | #0 NaN';
				for (i = 1; i < pointAmountL + 1; i++) {
					document.getElementById("ll" + i).src = "./images/LeftNoPoint.png";
					document.getElementById("rl" + i).src = "./images/RightNoPoint.png";
					document.getElementById("ll" + i).style.opacity = "0";
					document.getElementById("rl" + i).style.opacity = "0";
				}
				for (i = 1; i < pointAmountU + 1; i++) {
					document.getElementById("lu" + i).src = "./images/LeftTopNoPoint.png";
					document.getElementById("ru" + i).src = "./images/RightTopNoPoint.png";
					document.getElementById("lu" + i).style.opacity = "0";
					document.getElementById("ru" + i).style.opacity = "0";
				}
			}, 1000);
		}
	}
};