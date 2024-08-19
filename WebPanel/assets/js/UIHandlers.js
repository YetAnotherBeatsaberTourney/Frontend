function PB(hashdiff) {
  let hash = hashdiff.split("_")[0];
  let diff = hashdiff.split("_")[1];
  let modifier = hashdiff.split("_")[2];

  let title = document
    .querySelector(`img[data-hash="${hash}"]`)
    .getAttribute("data-title");

  let Name1;
  let Name2;
  let ID1;
  let ID2;

  if (tmconfig == 1) {
    if (!PlayerIDs[3]) {
      Name1 = PlayerNames[0];
      Name2 = PlayerNames[1];
      ID1 = PlayerIDs[0];
      ID2 = PlayerIDs[1];
    } else {
      Name1 = TeamNamesIDs[0];
      Name2 = TeamNamesIDs[2];
      ID1 = TeamNamesIDs[1];
      ID2 = TeamNamesIDs[3];
    }
  } else if (tmconfig == 2) {
    Name1 = TeamInfos[0].name;
    Name2 = TeamInfos[1].name;
    ID1 = TeamInfos[0].captain.id;
    ID2 = TeamInfos[1].captain.id;
  }
  Swal.fire({
    title: "Correct map?",
    html: `Map: <b>${title}</b>.<br>Difficulty: <b>${diff}</b>.`,
    showDenyButton: false,
    confirmButtonText: "Yes",
    cancelButtonText: `No`,
    cancelButtonColor: "#464646",
    showCancelButton: true,
    allowOutsideClick: false,
    allowEscapeKey: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Who's picking?",
        html: `Map: <b>${title}</b>.<br>Difficulty: <b>${diff}</b>`,
        showDenyButton: true,
        showDenyButton: true,
        confirmButtonText: Name1,
        denyButtonText: Name2,
        cancelButtonText: `Tiebreaker`,
        confirmButtonColor: "#ff5252",
        denyButtonColor: "#a768eb",
        cancelButtonColor: "#464646",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            html: `Map: <b>${title}</b>.<br>Difficulty: <b>${diff}</b> <br>Picker: <b>${Name1}</b>`,
            ...swalPBConfig,
          }).then((result) => {
            console.log({
              Type: "5",
              command: "PicksAndBans",
              Action: "Pick",
              map: hash,
              Actor: ID1,
            });
            if (result.isConfirmed) {
              ws.send(
                JSON.stringify({
                  Type: "5",
                  command: "PicksAndBans",
                  Action: "Pick",
                  map: hash,
                  Actor: ID1,
                }),
              );
              appendSongs(hash, diff, title, Name1, modifier);
            } else if (result.isDenied) {
              ws.send(
                JSON.stringify({
                  Type: "5",
                  command: "PicksAndBans",
                  Action: "Ban",
                  map: hash,
                  Actor: ID1,
                }),
              );
            } else if (result.isDismissed) {
              PB(hashdiff);
            }
          });
        } else if (result.isDenied) {
          Swal.fire({
            html: `Map: <b>${title}</b>.<br>Difficulty: <b>${diff}</b> <br>Picker: <b>${Name2}</b>`,
            ...swalPBConfig,
          }).then((result) => {
            if (result.isConfirmed) {
              ws.send(
                JSON.stringify({
                  Type: "5",
                  command: "PicksAndBans",
                  Action: "Pick",
                  map: hash,
                  Actor: ID2,
                }),
              );
              appendSongs(hash, diff, title, Name2, modifier);
            } else if (result.isDenied) {
              ws.send(
                JSON.stringify({
                  Type: "5",
                  command: "PicksAndBans",
                  Action: "Ban",
                  map: hash,
                  Actor: ID2,
                }),
              );
            } else if (result.isDismissed) {
              PB(hashdiff);
            }
          });
        } else if (result.isDismissed) {
          ws.send(
            JSON.stringify({
              Type: "5",
              command: "PicksAndBans",
              Action: "Tiebreaker",
              map: hash,
              Actor: "0",
            }),
          );
          appendSongs(hash, diff, title, "Tiebreaker", modifier);
        }
      });
    }
  });
}

function sendToOverlay(type) {
  if (type === "requestMatches") {
    ws.send(
      JSON.stringify({
        Type: "5",
        command: "requestMatches",
      }),
    );
  }
  if (type === "selectMatch") {
    if (selectedMatch.index === 0) {
      alert("Please select a match");
      return;
    }
    PlayerIDs = [];

    [PlayerIDs[0], PlayerIDs[1]] = [
      selectedMatch.dataset.player1Id,
      selectedMatch.dataset.player2Id,
    ];
    [PlayerNames[0], PlayerNames[1]] = [
      selectedMatch.dataset.player1Name,
      selectedMatch.dataset.player2Name,
    ];

    if (
      selectedMatch.dataset.player3Guid !=
      "00000000-0000-0000-0000-000000000000" &&
      selectedMatch.dataset.player4Guid !=
      "00000000-0000-0000-0000-000000000000"
    ) {
      [PlayerIDs[2], PlayerIDs[3]] = [
        selectedMatch.dataset.player3Id,
        selectedMatch.dataset.player4Id,
      ];
      [PlayerNames[2], PlayerNames[3]] = [
        selectedMatch.dataset.player3Name,
        selectedMatch.dataset.player4Name,
      ];
    }
    matchId = selectedMatch.dataset.matchId;
    configure();
  }
  if (type === "playerScreen") {
    const playerScreenNames = document.getElementById("playerScreenNames");
    const alive = document.getElementById("alive");
    if (playerScreenNames.value === "") return;
    if (alive.value === "") return;

    const username =
      playerScreenNames.options[playerScreenNames.selectedIndex].text;
    const userid = playerScreenNames.value;
    const score = document.getElementById("score").value;
    ws.send(
      JSON.stringify({
        Type: "6",
        command: "updateScore",
        PlayerId: userid,
        score: score,
        alive: alive.value,
      }),
    );

    if (alive.value === "false") {
      const select = document.getElementById("playerSpectatingNames");
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === username) {
          select.remove(i);
        }
      }
      document.getElementById("score").value = "";
      playerScreenNames.selectedIndex = 0;
      alive.selectedIndex = 0;
      select.selectedIndex = 0;
      $(`#playerScreenNames option[value='${userid}']`).remove();
      $(`#playerSpectatingNames option[value='${username}']`).remove();
    }
  }
  if (type === "playerSpec") {
    const username = document.getElementById("playerSpectatingNames").options[
      document.getElementById("playerSpectatingNames").selectedIndex
    ].text;
    const twitchname = document.getElementById("playerSpectatingNames").value;
    ws.send(
      JSON.stringify({
        Type: 6,
        command: "updateSpectator",
        Player: username,
        Twitch: twitchname,
      }),
    );
  }
  if (type === "PSplayerSpec") {
    const P1Twitch = document.getElementById("Team1playerSpectatingNames");
    const P2Twitch = document.getElementById("Team2playerSpectatingNames");

    const P1Id = P1Twitch.value;
    const P1Name = P1Twitch.options[P1Twitch.selectedIndex].text;
    const P1TwitchName = P1Twitch.options[P1Twitch.selectedIndex].getAttribute("twitch");

    const P2Id = P2Twitch.value;
    const P2Name = P2Twitch.options[P2Twitch.selectedIndex].text;
    const P2TwitchName = P2Twitch.options[P2Twitch.selectedIndex].getAttribute("twitch");

    ws.send(
      JSON.stringify({
        Type: 6,
        command: "psSpec",
        Twitch: [P1TwitchName, P2TwitchName],
        Ids: [P1Id, P2Id],
        Names: [P1Name, P2Name]
      }),
    );
  }
  if (type === "resetSpec") {
    ws.send(
      JSON.stringify({
        Type: 6,
        command: "resetSpectator",
      }),
    );
  }
  if (type === "currentMap") {
    const selectElement = document.getElementById("currentMap");
    const hash = selectElement.value;
    const diffOption = selectElement.options[selectElement.selectedIndex];
    const diff = diffOption.getAttribute("data-hash").toLowerCase();
    const player = diffOption.getAttribute("data-name");
    const modifiers = diffOption.getAttribute("data-modifiers");
    const diffValue =
      diff === "easy"
        ? 0
        : diff === "normal"
          ? 1
          : diff === "hard"
            ? 2
            : diff === "expert"
              ? 3
              : diff === "expertplus"
                ? 4
                : 0;

                
    CurrentMapData = [hash, diffValue, modifiers, player];
    ws.send(
      JSON.stringify({
        Type: 3,
        command: "updateMap",
        LevelId: hash,
        Diff: diffValue,
        Modifiers: modifiers,
        MatchId: matchId,
        Player: player,
      }),
    );
  }
  if (type === "sendScore") {
    if (tmconfig == 1) {
      var p1Score = document.getElementById("P1ScoreSlider").value;
      var p2Score = document.getElementById("P2ScoreSlider").value;

      if (!PlayerIDs[3]) {
        ws.send(
          JSON.stringify({
            Type: "5",
            matchStyle: "1v1",
            command: "updateScore",
            PlayerIds: [PlayerIDs[0], PlayerIDs[1]],
            Score: [p1Score, p2Score],
          }),
        );
      } else {
        ws.send(
          JSON.stringify({
            Type: "5",
            matchStyle: "2v2",
            command: "updateScore",
            TeamIds: [TeamNamesIDs[1], TeamNamesIDs[3]],
            Score: [p1Score, p2Score],
          }),
        );
      }
    } else if (tmconfig == 2) {
      var t1Score = document.getElementById("T1ScoreSlider").value;
      var t2Score = document.getElementById("T2ScoreSlider").value;

      ws.send(
        JSON.stringify({
          Type: "5",
          matchStyle: "PS",
          command: "updateScore",
          Score: [t1Score, t2Score],
        }),
      );
    }
  }
}

function sendReplay(Actor) {
  console.log("Sending replay for " + Actor);
  if (PlayerIDs <= 2) {
    document.getElementById(`player${Actor}Replay`).setAttribute("disabled", "disabled");
  } else {
    document.getElementById(`team${Actor}Replay`).setAttribute("disabled", "disabled");
  }
  ws.send(JSON.stringify({ Type: "5", command: "mapReplay", Actor: Actor }));
}

function sendPStatus(status) {
  const PSalive = document.getElementById("PSalive");
  PSalive.options[PSalive.selectedIndex].text = `${status} | ${PSalive.options[PSalive.selectedIndex].text.split(" | ")[1]
    }`;
  ws.send(
    JSON.stringify({
      Type: "5",
      command: "health",
      Actor: PSalive.value,
      Status: status,
    }),
  );
}
