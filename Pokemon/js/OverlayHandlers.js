async function setOverlay(captains, playerIDs, playerNames, Round) {
	document.getElementById("TextBox").style.opacity = "0";

	
	document.getElementById("Player1Name").innerText = teamNames[0];
	document.getElementById("Player2Name").innerText = teamNames[1];
	document.getElementById("Player1Image").src = teamImages[0];
	document.getElementById("Player2Image").src = teamImages[1];


	await fetch('https://spi.danesaber.cf/api/bs/ss/' + captains[0].id)
	.then(response => response.json())
	.then(data => {
		document.getElementById('Team1CaptainPFP').src = data.profilePicture;
	});

	await fetch('https://spi.danesaber.cf/api/bs/ss/' + captains[1].id)
	.then(response => response.json())
	.then(data => {
		document.getElementById('Team2CaptainPFP').src = data.profilePicture;
	});

	for (let i = 0; i < playerIDs[0].length; i++) {
		await fetch('https://spi.danesaber.cf/api/bs/ss/' + playerIDs[0][i].id)
			.then(response => response.json())
			.then(data => {
				document.getElementById(`Team1_${i}`).src = data.profilePicture;
			});
	}
	for (let i = 0; i < playerIDs[1].length; i++) {
		await fetch('https://spi.danesaber.cf/api/bs/ss/' + playerIDs[1][i].id)
			.then(response => response.json())
			.then(data => {
				document.getElementById(`Team2_${i}`).src = data.profilePicture;
			});
	}

	document.getElementById("RoundText").outerHTML = `<div id="RoundText" class="RoundText">${FormatText(Round)}</div>`;
	document.getElementById("PlayerContainers").style.opacity = 1;
	document.getElementById("PlayerBounds").style.opacity = 1;
	document.getElementById("Bar1").style.opacity = 1;
	document.getElementById("Bar2").style.opacity = 1;
	document.getElementById("TugOfWar").style.opacity = 1;
	document.getElementById("TextBox").style.opacity = 1;
}