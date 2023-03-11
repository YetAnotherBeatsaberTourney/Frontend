$(document).ready(function () {
    setCountdown();
    setSong();
  setInterval(function () {
    setSong();
  }, 5000);
});

function setSong() {
    $.get("./Snip/Snip.txt", function (data) {
      if (data != $("#SongTitle").text()) {
        $("#SongTitle").text(data);
      }
    });
}

function setCountdown() {
    $.get("./Timer.txt", function (data) {
      if (data != $(".CountdownClock").text()) {
        $(".CountdownClock").text(data);
      }
    });
}

$(document).ready(function () {
  $(".CountdownClock").click(function () {
    var time = $(this).text();
    var timeArray = time.split(":");
    var minutes = parseInt(timeArray[0]);
    var seconds = parseInt(timeArray[1]);
    var timeLeft = minutes * 60 + seconds;
    
    var interval = setInterval(function () {
      timeLeft--;
      var minutes = Math.floor(timeLeft / 60);
      var seconds = timeLeft - minutes * 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
            $(".CountdownClock").text(minutes + ":" + seconds);
      if (timeLeft <= 0) {
        clearInterval(interval);
        $(".CountdownClock").css("opacity", "0");
      }
      
      var timeTotal = 15 * 60;
      var width = (timeLeft / timeTotal) * 100;
      $(".CountdownBar").css("width", width-1 + "%");
    }, 1000);
  });
});