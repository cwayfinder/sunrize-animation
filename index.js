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

  function prepareTrajectoryElement() {
    if (config.trajectoryElement) {
      const data = animationData();
      const style = config.trajectoryElement.style;
      style.position = 'fixed';
      style.borderRadius = '50%';
      style.width = (data.R * 2) + 'px';
      style.height = (data.R * 2) + 'px';
      style.left = (data.L / 2 - data.R) + 'px';
      style.top = data.h + 'px';
    }
  }

  function prepareDomElements() {
    prepareTrajectoryElement();

    const data = animationData();
    const style = config.sunElement.style;
    style.position = 'fixed';
    style.left = '50%';
    style.marginTop = `-${data.r}px`;
    style.marginLeft = `-${data.r}px`;
    style.top = data.h + 'px';
    style.transformOrigin = `50% ${data.R + data.r}px`;
  }

  function moveSun() {
    var data = animationData();

    var angle = getCurrentAngle() - (data.phi / 2);
    config.sunElement.style.transform = `rotate(${angle}deg)`;
  }

  function updateProperty(_config, propertyName) {
    if (_config[propertyName]) {
      config[propertyName] = _config[propertyName];
    }
  }

  function updateConfig(_config) {
    updateProperty(_config, 'sunriseTime');
    updateProperty(_config, 'sunsetTime');
    updateProperty(_config, 'currentTime');
    updateProperty(_config, 'sunElement');
    updateProperty(_config, 'trajectoryElement');
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
      config.sunElement.style.transition = `transform ${duration}s linear`;
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

      if (config.sunriseTime && config.sunsetTime && config.currentTime) {
        moveSun();
        updateAnimationDuration();
      }
    }
  }
})();
