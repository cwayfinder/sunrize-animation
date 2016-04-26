function animationData() {
  function radToDeg(rad) {
    return rad * 180 / Math.PI;
  }
  
  const h = window.innerHeight / 2;
  const L = window.innerWidth;
  const sunRadius = document.querySelector('.sun-wrapper').offsetWidth / 2;

  // var R = (0.5 * h) + (Math.pow(L, 2) / (8 * h));
  const R = h;  // (2)
  const alpha = 2 * Math.acos((R - h) / R);  // (3)
  const gamma = 2 * Math.asin(sunRadius / (2 * R));  // (4)
  const phi = alpha + 2 * gamma;  // (5)

  return {
    L: L,
    R: R,
    alpha: radToDeg(alpha),
    gamma: radToDeg(gamma),
    phi: radToDeg(phi),
    r: sunRadius
  }
}

function prepareSunrise(data) {
  var data = animationData();

  var sunContainer = document.querySelector('.trajectory');
  sunContainer.style.width = (data.R * 2) + 'px';
  sunContainer.style.height = (data.R * 2) + 'px';
  sunContainer.style.left = (data.L / 2 - data.R) + 'px';
// sunContainer.style.top = height / 2 + 'px';
  sunContainer.style.top = 0;

  var sun = document.querySelector('.sun-wrapper');
// outer.style.top = height / 2 + 'px';
  sun.style.top = 0;
  sun.style.transformOrigin = `50% ${data.R + data.r}px`;

  console.log('alpha', data.alpha);
  console.log('gamma', data.gamma);
  console.log('phi', data.phi);
}

function setSunPosition(offset) {
  var data = animationData();

  var sun = document.querySelector('.sun-wrapper');
  var angle = offset - (data.phi / 2);
  // var angle = offset - (data.alpha / 2);
  sun.style.transform = `rotate(${angle}deg)`;
}


prepareSunrise();
setSunPosition(0);






