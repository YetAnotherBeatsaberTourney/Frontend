// Language: javascript
// Path: init.js
var usernames: string;
var userids: number;
var twitchnames: string;
var inMatch: boolean = false;

const ws = new WebSocket("ws://danesaber.cf:2223");
ws.onopen = function() {
    console.log("Connected to the websocket!");
	let timerInterval
	Swal.fire({
	title: 'You\'re connected!',
	html: 'Press the "<b>Configure</b>"-button, to setup the overlay.',
	timer: 3000,
	timerProgressBar: true,
	willClose: () => {
		clearInterval(timerInterval)
	}
	}).then((result) => {
	if (result.dismiss === Swal.DismissReason.timer) {
		console.log('I was closed by the timer')
	}
	});
}
ws.onerror=function(event){
Swal.fire({
	title: 'WebSocket <b>timed out</b>!',
html: 'Contact Hawk on Discord.'})
}
function addUsernames(usernames: string, userids: number, twitchnames: string) {
    var select1 = document.getElementById("playerScreenNames");
    var select2 = document.getElementById("playerSpectatingNames");
    for (var i = 0; i < usernames.length; i++) {
        var opt = usernames[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = userids[i];
        select1.appendChild(el);
        var ell = document.createElement("option");
        ell.textContent = opt;
        ell.value = twitchnames[i];
        select2.appendChild(ell);
    }
}

function reset() {
    if (inMatch) {
        ws.send(JSON.stringify({'Type': '6','command':'resetUsers'}));
        inMatch = false;
        location.reload();
    }
}
function sendToOverlay(type: string) {
    if (type == "playerScreen") {
        var username = document.getElementById("playerScreenNames").options[document.getElementById("playerScreenNames").selectedIndex].text;
        var userid = document.getElementById("playerScreenNames").value;
        var score = document.getElementById("score").value;
        var alive = document.getElementById("alive").value;
        ws.send(JSON.stringify({'Type': '6','command':'updateScore','PlayerId': userid,'score': score,'alive': alive}));
        if (alive == "false") {
            //Remove username from from playerSpectatingNames where username is the same as the one in playerScreenNames
            var select = document.getElementById("playerSpectatingNames");
            for(var i = 0; i < select.options.length; i++){
                if(select.options[i].text == username){
                    select.remove(i);
                }
            }
            //Reset alive dropdown pick
            document.getElementById("alive").selectedIndex = 0;
            $("#playerScreenNames option[value='"+userid+"']").remove();
            $("#playerSpectatingNames option[value='"+username+"']").remove();
        }
        console.log(JSON.stringify({'Type': '6','command':'updateScore','PlayerId': userid,'score': score,'alive': alive}));
    } else if (type == "playerSpec") {
        var userid = document.getElementById("playerSpectatingNames").options[document.getElementById("playerSpectatingNames").selectedIndex].text;
        var twitchname = document.getElementById("playerSpectatingNames").value;
        ws.send(JSON.stringify({'Type': '6','command':'updateSpectator','Player': userid,'Twitch': twitchname}));
    } else if (type == "resetSpec") {
        ws.send(JSON.stringify({'Type': '6','command':'resetSpectator'}));
    }
}
function configure()
    Swal.fire({
        title: 'Complete list of usernames',
        input: 'textarea',
        heightAuto: true,
        confirmButtonText: 'Confirm',
        footer: '<a  href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>'
      }).then(function(result) {
        if (result.value) {
            usernames = result.value.split("\n");
            Swal.fire({
            title: 'Complete list of userids',
            input: 'textarea',
            heightAuto: true,
            confirmButtonText: 'Confirm',
            footer: '<a  href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>'
            }).then(function(result) {
              if (result.value) {
                userids = result.value.split("\n");
                
                Swal.fire({
                title: 'Complete list of Twitchnames',
                input: 'textarea',
                heightAuto: true,
                confirmButtonText: 'Confirm',
                footer: '<a  href="https://api.danesaber.cf/guide" target="blank"_>How to do this.</a>'
                }).then(function(result) {
                  if (result.value) {
                    twitchnames = result.value.split("\n");
                    addUsernames(usernames,userids,twitchnames);
                    document.getElementById("configurebutton").setAttribute("disabled", "");
                    document.getElementById("playerScreenNames").removeAttribute("disabled");
                    document.getElementById("playerSpectatingNames").removeAttribute("disabled");
                    document.getElementById("score").removeAttribute("disabled");
                    document.getElementById("alive").removeAttribute("disabled");
                    document.getElementById("playerScreen").removeAttribute("disabled");
                    document.getElementById("playerSpec").removeAttribute("disabled");
                    document.getElementById("playerResetSpec").removeAttribute("disabled");
                    document.getElementById("BRDIV").style.display ="inline-block";
        
                    setTimeout(function() {
                        document.getElementById("BRDIV").style.opacity = "1";
                    }, 1000);
                    inMatch = true;
                    ws.send(JSON.stringify({'Type': '6','command':'createUsers','PlayerNames': usernames,'PlayerIds': userids,'order': usernames.length}));                 
                }
                });
            }
            });
        }
      })
}