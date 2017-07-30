$(document).ready(function (){
  var clockType = "WORK";
  var tStatus = "START";
  var workLength = 25;
  var breakLength = 5;
  var myTimer;
  var alarmSound ='<audio src="http://astroannie.com/my_images/sounds/myBeeps.mp3" autoplay>BEEP! BEEP! BEEP! BEEP! BEEP!</audio>';
  var silence = "";
  var isRunning = false;
  $("#bMinus").on("click",function(){
    if(isRunning && clockType == "BREAK") {
      stopTimer();
    }
    if(breakLength > 1){
      breakLength--;
    }
    dispBreak(breakLength);
    if(clockType == "BREAK"){
      dispTime(clockType,fulltime(breakLength));
    }
  });
  $("#bPlus").on("click",function(){
    if(isRunning && clockType == "BREAK") {
       stopTimer();
    }
    if(breakLength < 60){
      breakLength++;
    }
    dispBreak(breakLength);
    if(clockType == "BREAK"){
      dispTime(clockType,fulltime(breakLength));
    }
  });
  $("#wMinus").on("click",function(){
    if(isRunning && clockType == "WORK") {
      stopTimer();
    }
    if(workLength > 1){
      workLength--;
    }
    dispWork(workLength);
    if(clockType == "WORK"){
      dispTime(clockType,fulltime(workLength));
    }
  });
  $("#wPlus").on("click",function(){
    if(isRunning && clockType == "WORK") {
       stopTimer();
    }
    if(workLength < 60){
      workLength++;
    }
    dispWork(workLength);
    if(clockType == "WORK"){
      dispTime(clockType,fulltime(workLength));
    }
  });
  $("#startMe").on("click",function(){
    if(isRunning){
      return;
    }
    isRunning = true;
    // start the timer
    var dispMins = clockType == "WORK" ? workLength : breakLength;
    var dispTotal = dispMins * 60; // total number of seconds
    dispTime(clockType,fulltime(dispMins));
    myTimer = setInterval(decrement, 1000);
    
    function decrement() {
      dispTotal--;
      var timeString = "";
      var mins = Math.floor(dispTotal / 60); // whole minutes
      var secs = dispTotal % 60; // leftover seconds
      if (mins < 10){
        timeString = "0" + mins;
      }
      else{
        timeString = mins;
      }
      if (secs < 10){
        timeString = timeString + ":0"+ secs;
      }
      else{
        timeString = timeString + ":"+ secs;
      }
      dispTime(clockType,timeString);
      if(dispTotal == 0) {
        clockType = clockType == "WORK" ? "BREAK" : "WORK";
        dispMins = clockType == "WORK" ? workLength : breakLength;
        dispTotal = dispMins * 60;
        $("#alarm").html(alarmSound);
      }
      else {
        $("#alarm").html(silence);
      }
    };
  });
  $("#stopMe").on("click",function(){
    stopTimer();
  });
  function stopTimer(){
    isRunning = false;
    clearInterval(myTimer);
  };
});
function dispBreak(bLen){
  var bString = "";
  if(bLen < 10){
    bString = "&nbsp;0"+bLen+"&nbsp;";
  }
  else {
    bString = "&nbsp;"+bLen+"&nbsp;";
  }
  $("#bSet").html(bString);
};
function dispWork(wLen){
  var wString = "";
  if(wLen < 10){
    wString = "&nbsp;0"+wLen+"&nbsp;";
  }
  else {
    wString = "&nbsp;"+wLen+"&nbsp;";
  }
  $("#wSet").html(wString);
};
function dispTime(cType,cTime) {
  $("#clockType").text(cType);
  $("#time").text(cTime);
};
function fulltime(min) {
  if(min < 10){
    min = "0" + min+ ":00";
  }
  else {
    min = min + ":00";
  }
  return min;
}
