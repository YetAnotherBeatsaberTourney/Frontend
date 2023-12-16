//Used to format map-length to a readable format.
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

//Used to format acc to a readable format.
function toFixed(num, fixed) {
	let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || +2) + '})?');
	return num.toString().match(re)[0];
}

//Used to format scores to a readable format.
function scoreFormatting(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

function FormatText(string) {
    let inputString = string;
    const firstSpaceIndex = inputString.indexOf(" ");
    const firstWord = inputString.substring(0, firstSpaceIndex);
    const remainingText = inputString.substring(firstSpaceIndex);
    const outputString = `${firstWord} <span style="font-weight:600;">${remainingText}</span>`;
    return outputString;
}

/* Replay Handlers */
function mapReplay(Actor) {
    if (Actor == 1) {
        p1Replay(false);
    }
    if (Actor == 2) {
        p2Replay(false);
    }
}
function resetReplays() {
    replayLeft = [1, 1];
    replaying = [0, 0];

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
    if (replayLeft[0] === 1 && !mapChange) {
        replayLeft[0] = 0;
        replaying[0] = 1;
        document.getElementById("Player1Replay").style.opacity = "0";
        document.getElementById("Player1Goal").style.opacity = "0";
        document.getElementById("Player1Replay").style.translate = "-150px";

        setTimeout(function () {
            document.getElementById("Player1Replay").innerText = "REPLAY CALLED";
            document.getElementById("Player1Goal").innerText = `TO BEAT: ${playerAcc[1]}%`;
            document.getElementById("Player1Replay").style.opacity = "1";
            document.getElementById("Player1Goal").style.opacity = "1";
            document.getElementById("Player1Replay").style.translate = "0px";
        }, 1000);
    } else if (replayLeft[0] == 0 && replaying[0] == 1 && mapChange) {
        replaying[0] = 0;
        document.getElementById("Player1Replay").style.opacity = "0";
        document.getElementById("Player1Goal").style.opacity = "0";
        document.getElementById("Player1Replay").style.translate = "-150px";

        setTimeout(function () {
            document.getElementById("Player1Replay").innerText = "R";
            document.getElementById("Player1Replay").style.opacity = "0.4";
            document.getElementById("Player1Replay").style.translate = "0px";
        }, 1000);
    }
}
function p2Replay(mapChange) {
    if (replayLeft[1] === 1 && !mapChange) {
        replayLeft[1] = 0;
        replaying[1] = 1;
        document.getElementById("Player2Replay").style.opacity = "0";
        document.getElementById("Player2Goal").style.opacity = "0";
        document.getElementById("Player2Replay").style.translate = "150px";

        setTimeout(function () {
            document.getElementById("Player2Replay").innerText = "REPLAY CALLED";
            document.getElementById("Player2Goal").innerText = `TO BEAT: ${playerAcc[0]}%`;
            document.getElementById("Player2Replay").style.opacity = "1";
            document.getElementById("Player2Goal").style.opacity = "1";
            document.getElementById("Player2Replay").style.translate = "0px";
        }, 1000);
    } else if (replayLeft[1] == 0 && replaying[1] == 1 && mapChange) {
        replaying[1] = 0;
        document.getElementById("Player2Replay").style.opacity = "0";
        document.getElementById("Player2Goal").style.opacity = "0";
        document.getElementById("Player2Replay").style.translate = "150px";

        setTimeout(function () {
            document.getElementById("Player2Replay").innerText = "R";
            document.getElementById("Player2Replay").style.opacity = "0.4";
            document.getElementById("Player2Replay").style.translate = "0px";
        }, 1000);
    }
}

//Player in pokemonbar positioning
function movePokemonConditionally() {
    const pokemonList = document.querySelectorAll(".MovablePokemon");
  
    // Replace this logic with your condition for each Pokémon
    pokemonList.forEach((pokemon) => {
      const locationClass = pokemon.classList[2]; // Assumes the location class is the third class
      const shouldMove = true;/* Add your condition here based on the Pokémon */;
  
      if (shouldMove) {
        pokemon.classList.add("movablePokemon");
        pokemon.classList.remove(locationClass); // Remove the old location class
        // Add the new location class based on your condition
        pokemon.classList.add(/* Add the new location class based on your logic */);
      }
    });
  }

/* Scoreline handler */
function changeScoreline(Score) {
    scoreLine = [Score[0], Score[1]];
        document.getElementById("Player1Score").innerText = Score[0];
        document.getElementById("Player2Score").innerText = Score[1];
}