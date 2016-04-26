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
  const maxDuration = 10; // 10 seconds
  var delta = Math.abs(fromAngle - toAngle);
  return maxDuration * delta / 360;
}

var count = 0;
function addCssRule(fromAngle, toAngle, duration) {
  // remove previous animation styles
  if (document.querySelector('#sun-style')) {
    document.querySelector('#sun-style').remove();
  }

  var style = document.createElement('style');
  style.id = 'sun-style';
  var animationName = 'circle' + count++;
  style.innerHTML = `
          @keyframes ${animationName} {
            from {
                transform: rotate(${fromAngle}deg);
            }
            to {
                transform: rotate(${toAngle}deg);
            }
          }

          .sun-wrapper {
            animation: ${animationName} ${duration}s linear;
          }
  `;
  document.querySelector('head').appendChild(style);
}


document.querySelector('#start').addEventListener('click', function() {
  var from = document.querySelector('#from').value;
  var to = document.querySelector('#to').value;

  var fromAngle = calculateAngle(from);
  var toAngle = calculateAngle(to);
  var duration = calculateDuration(fromAngle, toAngle);

  console.log(from, to, fromAngle, toAngle, duration);

  addCssRule(fromAngle, toAngle, duration);
});
