function PSHandler() {
  Swal.fire({
    title: "Teams.json",
    html: "Before continuing, ensure that Teams.json in ./Assets/ is valid and updated!",
    heightAuto: true,
    confirmButtonText: "Confirm",
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then(function (result) {
    if (result.value) {
      $.ajax({
        url: "./assets/Teams.json",
        dataType: "json",
        success: function (teamsData) {
            teamOptions = teamsData;
            for (var i = 0; i < teamsData.length; i++) {
                tempTeamData.push(teamsData[i].name);
            }
            selectTeam(1);
        },
        error: function (error) {
          console.error("Error fetching Teams.json:", error);
        }
      });
    }
  });
}

function selectTeam(id) {
  if (id == 1) {
    Swal.fire({
      ...psTeam1,
    }).then((result) => {
        const selectedTeam = teamOptions[result.value];
        TeamInfos[0] = selectedTeam;
        tempTeamData.splice(result.value, 1);
        teamOptions.splice(result.value, 1);
        selectTeam(2);
    });
  } else if (id == 2) {
    Swal.fire({
      ...psTeam2,
    }).then((result) => {
        TeamInfos[1] = teamOptions[result.value];
        teamOptions = [];
        tempTeamData = [];
        createSwal({
          title: 'Round Title',
          input: 'text',
          inputPlaceholder: 'Round 1',
          footer: '<a href="https://www.youtube.com/watch?v=_UYZaVLu1h0" target="blank"_>How to do this.</a>',
          ...swalConfig,
      }).then((result) => {
          if (result.value) {
              round = result.value;
              document.getElementById("playerScore").removeAttribute("disabled");
              document.getElementById("T1ScoreSlider").removeAttribute("disabled");
              document.getElementById("T2ScoreSlider").removeAttribute("disabled");
              document.getElementById("currentMap").removeAttribute("disabled");
              document.getElementById("mapPlaying").removeAttribute("disabled");
              document.getElementById("PSalive").removeAttribute("disabled");
              document.getElementById("Team1playerSpectatingNames").removeAttribute("disabled");
              document.getElementById("Team2playerSpectatingNames").removeAttribute("disabled");
              document.getElementById("T1Name").innerHTML = `${TeamInfos[0].name}'s score`;
              document.getElementById("T2Name").innerHTML = `${TeamInfos[1].name}'s score`;
              document.getElementById("T1SName").innerHTML = `${TeamInfos[1].name}`;
              document.getElementById("T2SName").innerHTML = `${TeamInfos[1].name}`;
              inMatch = true;

              //Add a disable option to the PSalive select, with the text being the team name
              var option = document.createElement("option");
              option.text = TeamInfos[0].name;
              option.disabled = true;
              document.getElementById("PSalive").add(option);

              for (var i = 0; i < TeamInfos[0].players.length; i++) {
                  var option = document.createElement("option");
                  option.text = TeamInfos[0].players[i].name;
                  option.value = TeamInfos[0].players[i].id;
                  option.setAttribute("twitch", TeamInfos[0].players[i].twitchname);
                  document.getElementById("Team1playerSpectatingNames").add(option);
                  document.getElementById("PSalive").add(option);
              }

              
              var option = document.createElement("option");
              option.text = TeamInfos[1].name;
              option.disabled = true;
              document.getElementById("PSalive").add(option);


              for (var i = 0; i < TeamInfos[1].players.length; i++) {
                  var option = document.createElement("option");
                  option.text = TeamInfos[1].players[i].name;
                  option.value = TeamInfos[1].players[i].id;
                  option.setAttribute("twitch", TeamInfos[1].players[i].twitchname);
                  document.getElementById("Team2playerSpectatingNames").add(option);
                  document.getElementById("PSalive").add(option);
              }

              ws.send(JSON.stringify({
                  Type: '5',
                  command: 'createUsers',
                  matchStyle: 'PS',
                  Teams: TeamInfos,
                  Round: round
              }));
              localPools();
          }
      })
    });
  }
}