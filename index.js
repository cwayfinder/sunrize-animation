const Sunrise = (function() {
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


  function animationData() {
    function radToDeg(rad) {
      return rad * 180 / Math.PI;
    }

    const h = window.innerHeight / 2;
    const L = window.innerWidth;
    const sunRadius = config.sunElement.offsetWidth / 2;

    var R = (0.5 * h) + (Math.pow(L, 2) / (8 * h));  // (2)
    //const R = h;
    const alpha = 2 * Math.acos((R - h) / R);  // (3)
    const gamma = 2 * Math.asin(sunRadius / (2 * R));  // (4)
    const phi = alpha + 2 * gamma;  // (5)

    return {
      h: h,
      L: L,
      R: R,
      alpha: radToDeg(alpha),
      gamma: radToDeg(gamma),
      phi: radToDeg(phi),
      r: sunRadius
    }
  }

  function prepareDomElements() {
    var data = animationData();

    var trajectory = document.querySelector('.trajectory');
    trajectory.style.width = (data.R * 2) + 'px';
    trajectory.style.height = (data.R * 2) + 'px';
    trajectory.style.left = (data.L / 2 - data.R) + 'px';
    trajectory.style.top = data.h + 'px';
    //trajectory.style.top = 0;

    var sun = document.querySelector('.sun-wrapper');
    sun.style.top = data.h + 'px';
    //sun.style.top = 0;
    sun.style.transformOrigin = `50% ${data.R + data.r}px`;

    console.log('alpha', data.alpha);
    console.log('gamma', data.gamma);
    console.log('phi', data.phi);
  }

  function moveSun() {
    var data = animationData();

    var angle = getCurrentAngle() - (data.phi / 2);
    config.sunElement.style.transform = `rotate(${angle}deg)`;
    console.log('angle', angle);
  }

  function updateConfig(_config) {
    config.sunriseTime = _config.sunriseTime;
    config.sunsetTime = _config.sunsetTime;
    config.currentTime = _config.currentTime;
    config.sunElement = _config.sunElement;
  }

  function getCurrentAngle() {
    const data = animationData();

    const sunriseInMinutes = calculateMinutes(config.sunriseTime);
    const deltaMin = calculateMinutes(config.sunsetTime) - sunriseInMinutes;
    const currentMin = calculateMinutes(config.currentTime) - sunriseInMinutes;

    return data.phi * currentMin / deltaMin;
  }

  function updateAnimationDuration() {
    if (config.prevTime) {
      var prevAngle = calculateAngle(config.prevTime);
      var angle = calculateAngle(config.currentTime);
      var duration = calculateDuration(prevAngle, angle);
      var sun = document.querySelector('.sun-wrapper');
      sun.style.transition = `transform ${duration}s linear`;
    }
    config.prevTime = config.currentTime;
  }


  const config = {};

  return {
    update: function(_config) {
      updateConfig(_config);

      if (!config.rendered) {
        prepareDomElements();
        config.rendered = true;
      }

      moveSun();
      updateAnimationDuration();
    }
  }
})();
