async function setOverlay(captains, playerIDs, playerNames, Round) {
  document.getElementById("TextBox").style.opacity = "0";

  aPlayerIds[0] = [playerIDs[0][0].id, playerIDs[0][1].id, playerIDs[0][2].id, playerIDs[0][3].id, playerIDs[0][4].id];
  aPlayerIds[1] = [playerIDs[1][0].id, playerIDs[1][1].id, playerIDs[1][2].id, playerIDs[1][3].id, playerIDs[1][4].id];
  aPlayerNames[0] = [playerIDs[0][0].name, playerIDs[0][1].name, playerIDs[0][2].name, playerIDs[0][3].name, playerIDs[0][4].name];
  aPlayerNames[1] = [playerIDs[1][0].name, playerIDs[1][1].name, playerIDs[1][2].name, playerIDs[1][3].name, playerIDs[1][4].name];

  document.getElementById("Player1Name").innerText = teamNames[0];
  document.getElementById("Player2Name").innerText = teamNames[1];
  document.getElementById("Player1Image").src = teamImages[0];
  document.getElementById("Player2Image").src = teamImages[1];

  await fetch("https://spi.danesaber.cf/api/bs/ss/" + captains[0].id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("Team1CaptainPFP").src = data.profilePicture;
    });

  await fetch("https://spi.danesaber.cf/api/bs/ss/" + captains[1].id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("Team2CaptainPFP").src = data.profilePicture;
    });

	for (let i = 0; i < playerIDs[0].length; i++) {
		await fetch("https://spi.danesaber.cf/api/bs/ss/" + playerIDs[0][i].id)
		  .then((response) => response.json())
		  .then((data) => {
			document.getElementById(`Team1_${i}`).src = data.profilePicture;
		  });
	  }
	  for (let i = 0; i < playerIDs[1].length; i++) {
		await fetch("https://spi.danesaber.cf/api/bs/ss/" + playerIDs[1][i].id)
		  .then((response) => response.json())
		  .then((data) => {
			document.getElementById(`Team2_${i}`).src = data.profilePicture;
		  }
		  );
	  }
	  

  document.getElementById(
    "RoundText",
  ).outerHTML = `<div id="RoundText" class="RoundText">${FormatText(
    Round,
  )}</div>`;
  document.getElementById("PlayerContainers").style.opacity = 1;
  document.getElementById("PlayerBounds").style.opacity = 1;
  document.getElementById("Bar1").style.opacity = 1;
  document.getElementById("Bar2").style.opacity = 1;
  document.getElementById("TugOfWar").style.opacity = 1;
  document.getElementById("TextBox").style.opacity = 1;
}
