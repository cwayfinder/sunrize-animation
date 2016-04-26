Sunrise.update({
  sunriseTime: '6:00',
  sunsetTime: '15:40',
  currentTime: '6:30',
  sunElement: document.querySelector('.sun-wrapper'),
  trajectoryElement: document.querySelector('.trajectory')
});


function animate(time) {
  Sunrise.update({
    sunriseTime: '6:00',
    sunsetTime: '15:40',
    currentTime: time
  });
}


document.querySelector('#start').addEventListener('click', function() {
  var time = document.querySelector('#current-time').value;
  animate(time);
});

var radioList = document.querySelectorAll('input[type="radio"]');
var radioArray = Array.prototype.slice.call(radioList, 0);
radioArray.forEach(function(radio) {
  radio.addEventListener('click', function() {
    var time = radio.value;
    animate(time);
  });
});
