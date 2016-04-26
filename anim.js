function calculateMinutes(time) {
  var split = time.split(':');

  var hours = Number(split[0]);
  var minutes = Number(split[1]);
  return hours * 60 + minutes;
}

function calculateAngle(time) {
  const maxMinutes = 24 * 60;
  return 360 * calculateMinutes(time) / maxMinutes;
}

function calculateDuration(fromAngle, toAngle) {
  const maxDuration = 5; // 5 seconds
  var delta = Math.abs(fromAngle - toAngle);
  return maxDuration * delta / 360;
}

function animate(time) {
  var prevAngle = calculateAngle(prevTime);
  var angle = calculateAngle(time);
  var duration = calculateDuration(prevAngle, angle);

  console.log(`time ${time}; angle ${angle}; duration ${duration}`);

  var sun = document.querySelector('.sun-wrapper');
  sun.style.transition = `transform ${duration}s linear`;

  setSunPosition(angle);
  // sun.style.transform = `rotate(${angle}deg)`;
}



var prevTime = '00:00';

document.querySelector('#start').addEventListener('click', function() {
  var time = document.querySelector('#current-time').value;
  animate(time);
  prevTime = time;
});

var radioList = document.querySelectorAll('input[type="radio"');
var radioArray = Array.prototype.slice.call(radioList, 0);
radioArray.forEach(function(radio) {
  radio.addEventListener('click', function() {
    var time = radio.value;
    animate(time);
    prevTime = time;
  });
});