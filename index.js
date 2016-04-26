var sunContainer = document.querySelector('.trajectory');
var width = window.innerWidth;
var height = window.innerHeight;
var radiusSun = 280;


var h = height / 2;
var L = width;

//var R = (0.5 * h) + (Math.pow(L, 2) / (8 * h));
var R = h;
var alpha = 2 * Math.acos((R - h) / R);
var gamma = 2 * Math.asin(L / (2 * R));
var fi = alpha + 2 * gamma;
var betta = 90 - fi / 2;

var centrX = width / 2;
var centrY = height + R;



//sunContainer.style.width = (R * 2) + 'px';
//sunContainer.style.height = (R * 2) + 'px';
//sunContainer.style.left = (width / 2 - R) + 'px';
//sunContainer.style.top = height / 2 + 'px';
//sunContainer.style.top = 0;


const sunSize = 100;
var outer = document.querySelector('.sun-wrapper');
//outer.style.top = height / 2 + 'px';
//outer.style.top = 0;
//outer.style.transformOrigin = `50% ${R + sunSize/2}px`;

console.log(R)
