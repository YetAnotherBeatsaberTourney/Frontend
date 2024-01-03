async function setOverlay(captains, playerIDs, playerNames, Round) {
  document.getElementById("TextBox").style.opacity = "0";

  aPlayerIds[0] = [
    playerIDs[0][0].id,
    playerIDs[0][1].id,
    playerIDs[0][2].id,
    playerIDs[0][3].id,
    playerIDs[0][4].id,
  ];
  aPlayerIds[1] = [
    playerIDs[1][0].id,
    playerIDs[1][1].id,
    playerIDs[1][2].id,
    playerIDs[1][3].id,
    playerIDs[1][4].id,
  ];
  aPlayerNames[0] = [
    playerIDs[0][0].name,
    playerIDs[0][1].name,
    playerIDs[0][2].name,
    playerIDs[0][3].name,
    playerIDs[0][4].name,
  ];
  aPlayerNames[1] = [
    playerIDs[1][0].name,
    playerIDs[1][1].name,
    playerIDs[1][2].name,
    playerIDs[1][3].name,
    playerIDs[1][4].name,
  ];

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
      });
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

//Change border on player that is changing health-state
async function changeHealth(player, health) {
  //We check if the player is on Team 1
  if (aPlayerIds[0].includes(player)) {
    //We index the player's position in the array
    let index = aPlayerIds[0].indexOf(player);
    //We find The div by class: Location[i]Left
    const div = document.getElementsByClassName(`Location${index + 1}Left`)[0];
    //We check if the player is alive or dead
    if (health == "Alive") {
      //If they're alive, we add the Alive class and remove the Dead class
      div.classList.add("Alive");
      div.classList.remove("Dead");

      //Else they're dead
    } else if (health == "Dead") {
      //And we add the Dead class and remove the Alive class
      div.classList.add("Dead");
      div.classList.remove("Alive");
    }

    //Else they're on Team 2
  } else if (aPlayerIds[1].includes(player)) {
    let index = aPlayerIds[1].indexOf(player);

    const div = document.getElementsByClassName(`Location${index + 1}Right`)[0];
    if (health == "Alive") {
      div.classList.add("Alive");
      div.classList.remove("Dead");
    } else if (health == "Dead") {
      div.classList.add("Dead");
      div.classList.remove("Alive");
    }
  }
}

// Here we change what player is playing
async function changeLive(player1, player2) {

  //We reset all the players to not playing
  for (let i = 0; i < 5; i++) {
    //Both for team 1
    const div = document.getElementsByClassName(`Location${i + 1}Left`)[0];
    if (div.classList.contains("Playing")) {
      div.classList.remove("Playing");
    }
    //And for team 2
    const div2 = document.getElementsByClassName(`Location${i + 1}Right`)[0];
    if (div2.classList.contains("Playing")) {
      div2.classList.remove("Playing");
    }
  }

  //Index the new player
  let i1 = aPlayerIds[0].indexOf(player1);
  //Find the div by class: Location[i]Left
  const div = document.getElementsByClassName(`Location${i1 + 1}Left`)[0];
  //Add the Playing class
  div.classList.add("Playing");

  let i2 = aPlayerIds[1].indexOf(player2);
  const div2 = document.getElementsByClassName(`Location${i2 + 1}Right`)[0];
  div2.classList.add("Playing");
}
