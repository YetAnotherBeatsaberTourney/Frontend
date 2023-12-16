async function setOverlay(playerIDs, playerNames, Round) {
	document.getElementById("TextBox").style.opacity = "0";
	fetch('https://spi.danesaber.cf/api/bs/ss/' + playerIDs[0])
		.then(response => response.json())
		.then(data => {
			document.getElementById("Player1Image").src = data.profilePicture;
			document.getElementById("Player1Name").innerText = playerNames[0];
			document.getElementById("Player1Name").style.opacity = '1';
		});
	fetch('https://spi.danesaber.cf/api/bs/ss/' + playerIDs[1])
		.then(response => response.json())
		.then(data => {
			document.getElementById("Player2Image").src = data.profilePicture;
			document.getElementById("Player2Name").innerText = playerNames[1];
			document.getElementById("Player2Name").style.opacity = '1';

			document.getElementById("RoundText").outerHTML = `<div id="RoundText" class="RoundText">${FormatText(Round)}</div>`;
			document.getElementById("PlayerContainers").style.opacity = 1;
			document.getElementById("PlayerBounds").style.opacity = 1;
			document.getElementById("TugOfWar").style.opacity = 1;
			document.getElementById("TextBox").style.opacity = "1";
			positionPlayers();
		});
}