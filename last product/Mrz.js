var zwrap = document.getElementById('z-wrap');
var zimgs = zwrap.getElementsByTagName('img');
var arr = [];
var timerz = 0;
var timez2 = 0;
var timerzrd = 0;
var timerz5 = 0;
var timerzlast = 0;
var tab = true;
for(var i = 0; i < zimgs.length; i++) {
	arr.push([zimgs[i].offsetLeft,zimgs[i].offsetTop]);
}
for(var i = 0; i < zimgs.length; i++) {
	zimgs[i].style.position = "absolute";
	css3d(zimgs[i],"rotateZ",720)
	zimgs[i].style.left = 200 + "px";
	zimgs[i].style.top = 200 + "px";
	zimgs[i].onclick = function () {
		zmove();
		return false;
	}
}
function zmove() {
	for(var i = 0; i < zimgs.length; i++) {
		mTween(zimgs[i],{left: arr[i][0],top: arr[i][1]},500,"linear",function() {
			for(var i = 0; i < zimgs.length; i++) {
				css3d(zimgs[i],"rotateZ",360);
			}
			timerz = setTimeout(function() {
				clearTimeout(timerz)
				zscale();
				change();
			},800)
		});
	}
}
function zscale() {
	for(var i = 0; i < zimgs.length; i++) {
		css3d(zimgs[i],"scale",.8);
	}
}
var nubstop = true;
function change() {
	for(var i = 0; i < zimgs.length; i++) {
		zimgs[i].onclick = function() {
			for(var i = 0; i < zimgs.length; i++) {
				zimgs[i].className = "round";
				//console.log(nubstop)
				timerz5 = setTimeout(function() {
					for(var i = 0; i < zimgs.length; i++) {
						zimgs[i].className = "hidden";
						css3d(zimgs[i],"opacity",0)
					}
				},1100)
				timerz2 = setTimeout(function() {
					timerzrd = setInterval(function(){
						for(var i = 0; i < zimgs.length; i++) {
							zimgs[i].className = "show";
						}
						if(nubstop == true) {
							zmoveround();
						}else {
							for(var i = 0; i < zimgs.length; i++) {
								clearTimeout(timerz2);
								clearInterval(timerzrd);
								zmove();
								css3d(zimgs[i],"translateZ",0);
								zimgs[i].style.opacity = 1;
								last();
							}
						}
						for(var i = 0; i < zimgs.length; i++) {
							zimgs[i].className = "round";
						}
						var nubzlast = Math.random()*8
						resize();
						clearInterval(timerzrd)
					},3500)
				},1500)
			}
			return false;
		}
	}
}
function zmoveround() {
	for(var i = 0; i < zimgs.length; i++) {
		var randomzl = parseInt(Math.random()*150);
		var randomzl2 = parseInt(Math.random()*100);
		var randomzl3 = parseInt(Math.random()*2);
		var nubzopa = parseInt(Math.random()*60)
		mTween(zimgs[i],{left: randomzl*(randomzl3+i),top: randomzl2*(randomzl3-2+i)+200,opacity: nubzopa},2000,"linear",function() {
			for(var i = 0; i < zimgs.length; i++) {
				mTween(zimgs[i],{opacity: 100},800,"linear")
			}
		})
		css3d(zimgs[i],"translateZ",randomzl*4);
	}
}
function resize() {
	console.log(222)
	for(var i = 0; i < zimgs.length; i++) {
		zimgs[i].onclick = function() {
			nubstop = false;
			for(var i = 0; i < zimgs.length; i++) {
				zimgs[i].className = "";
				//console.log(111)
				mTween(zimgs[i],{left: arr[i][0],top: arr[i][1]},500,"linear")
			}
		}
	}
}
var timerzsuiji = 0;
timerzsuiji = setInterval(function() {
	var timerzlasta = parseInt(Math.random()*8);
	nubsuiji = timerzlasta;
},1000); 
var nubsuiji = 0
function last() {
	zimgs[nubsuiji].style.opacity = .1;
	timerlast = setTimeout(function(){
		mTween(zimgs[nubsuiji],{opacity: 100},400,"linear")
	},300)
}

//--------------------------------------------------------------------------canvas

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,
  hue = 217,
  stars = [],
  count = 0,
  maxStars = 1200;
var canvas2 = document.createElement('canvas'),
ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, '#fff');
gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();
function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function maxOrbit(x, y) {
  var max = Math.max(x, y),
   diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
}
var Star = function() {
  this.orbitRadius = random(maxOrbit(w, h));
  this.radius = random(60, this.orbitRadius) / 12;
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 850000;
  this.alpha = random(2, 10) / 10;
  count++;
  stars[count] = this;
}
Star.prototype.draw = function() {
	var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
	y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
	twinkle = random(10);
	if (twinkle === 1 && this.alpha > 0) {
		this.alpha -= 0.05;
	} else if (twinkle === 2 && this.alpha < 1) {
		this.alpha += 0.05;
	}
	ctx.globalAlpha = this.alpha;
	ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
	this.timePassed += this.speed;
}
for (var i = 0; i < maxStars; i++) {
  new Star();
}
function staranimation() {
	ctx.globalCompositeOperation = 'source-over';
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'hsla(' + 25 + ', 30%, 75%, 1)';
	ctx.fillRect(0, 0, w, h)
	ctx.globalCompositeOperation = 'lighter';
	for (var i = 1, l = stars.length; i < l; i++) {
		stars[i].draw();
	};
window.requestAnimationFrame(staranimation);//请求动画帧http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/有介绍好多。。好难看下去
}
staranimation(); 
// ------------------------------------------------------------------nav 
var decoration = document.getElementById('decoration');
var nav = document.getElementById('nav');
var zlis = nav.getElementsByTagName('li');
zlis[1].style.background = "#ae9c85";
for(var i = 0; i < zlis.length; i++){
	zlis[i].index = i;
	zlis[i].onmouseover = function() {
		if(this.index == 1) {
			for(var i = 0; i < zlis.length; i++){
				zlis[i].style.background = "";
			}
			zlis[1].style.background = "#ae9c85";
		}else {
			for(var i = 0; i < zlis.length; i++){
				zlis[i].style.background = "";
			}
			zlis[1].style.background = "#ae9c85";
			this.style.background = "#ddd6c6";
		}
	}
}
nav.onmouseover = function() {
	mTween(nav,{left: 0},200,"linear");
	nav.onmouseout = function() {
		mTween(nav,{left: -82},200,"linear")
	}
}
for(var i = 0; i < zlis.length; i++) {
	zlis[i].index = i;
	zlis[i].onclick = function() {
		if(this.index == 0) {
		  ballsf()
          setTimeout(function(){
          	window.open("index.html","_self");
          },6000)
			
		}
		if(this.index == 2) {
			ballsf()
          	setTimeout(function(){
          		window.open("作品.html","_self");
          	},6000)			
		}
	}
}
function ballsf(){
 	var timesf1=0
 	var numsf1=1
	var ball = document.querySelector(".bgball")
 	timesf1=setInterval(function(){
 		numsf1++
 		ball.style.width=10*numsf1+"px"
 		ball.style.height=10*numsf1+"px"	
 	},20)
}