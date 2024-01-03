function scoreUpdate(player, score, combo, acc, misses, reset) {
	//Check if playerIds[0] includes player id, if so, update player 1, else update player 2
	if (aPlayerIds[0].includes(player)) {
		updatePlayerData(0, score, combo, acc, misses);
	} else if (aPlayerIds[1].includes(player)) {
		updatePlayerData(1, score, combo, acc, misses);
	}
	
	// if (playerIDs[0] === player) {
	// 	updatePlayerData(0, score, combo, acc, misses);
	// } else if (playerIDs[1] === player) {
	// 	updatePlayerData(1, score, combo, acc, misses);
	// }

	if (player === 0 && reset === 1) {
		resetAllPlayers();
	}
}

function updatePlayerData(index, score, combo, acc, misses) {
	playerAcc[index] = acc.toFixed(2);
	playerCombo[index] = combo;
	playerScore[index] = score;
	playerMisses[index] = misses;

	updateTug();

	document.getElementById(`Player${index + 1}Combo`).innerHTML = playerCombo[index] + "x";
	document.getElementById(`Player${index + 1}ACC`).innerHTML = playerAcc[index] + "%";

	if (misses >= 1) {
		document.getElementById(`Player${index + 1}FC`).style.color = "#d15252";
		document.getElementById(`Player${index + 1}FC`).innerHTML = playerMisses[index] + "x";
		playerFC[index] = false;
	} else {
		playerFC[index] = true;
		document.getElementById(`Player${index + 1}FC`).style.color = "#ffffff";
		document.getElementById(`Player${index + 1}FC`).innerHTML = "FC";
	}
}
function resetAllPlayers() {
	playerFC = [true, true];
	playerScore = [0, 0];
	playerAcc = [0, 0];
	playerCombo = [0, 0];
	playerMisses = [0, 0];

	updateTug();

	for (let i = 0; i < 2; i++) {
		document.getElementById(`Player${i + 1}FC`).style.color = "#ffffff";
		document.getElementById(`Player${i + 1}FC`).innerHTML = "FC";
		document.getElementById(`Player${i + 1}Combo`).innerHTML = "0x";
		document.getElementById(`Player${i + 1}ACC`).innerHTML = "0.00%";
	}
}


function updateTug() {
	const leftTug = document.getElementById("LeftTug");
	const rightTug = document.getElementById("RightTug");

	if (playerAcc[0] === playerAcc[1]) {
		leftTug.style.width = "0%"
		rightTug.style.width = "0%";
		return;
	}

	if (playerAcc[0] > playerAcc[1]) {
		rightTug.style.width = "0%";
		leftTug.style.width = `${(playerAcc[0] - playerAcc[1]) * 2.5}%`;
		return;
	}
	if (playerAcc[1] > playerAcc[0]) {
		leftTug.style.width = "0%";
		rightTug.style.width = `${(playerAcc[1] - playerAcc[0]) * 2.5}%`;
		return;
	}
}
