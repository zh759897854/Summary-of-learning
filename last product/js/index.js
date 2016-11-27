(function(doc) {
			var oBox = doc.getElementById('box');
			var oTiao = doc.getElementById('tiao');
			var sec=document.getElementById('imgs');
			var imgs=sec.getElementsByTagName('img');
			var Bell = doc.querySelector('#tiao .bell');
			var Bg=doc.getElementById('bj');
			var Row = 4;
			var Cell = 6;
			var Nub = 24;
			var W = 0;
			var H = 0;
			var BW = 0;
			var BH = 0;
			var loaded = 0;
			var i = 1;
			var timers=0;
			var timer2=0;
		
			
				//创建大的图片img
					for(i = 1; i <= Nub; i++) {
						var oImg = new Image();

						oImg.onload = function() {
							BW = this.width;
							BH = this.height;
							//console.log(BW,BH)
							if(++loaded == Nub * 2) {
								loadedSucc();
							}
						};

						oImg.src = 'images/' + i + '.jpg';
					}
					//创建小的图片img
					for(i = 1; i <= Nub; i++) {
						var oImg = new Image();

						oImg.onload = function() {
							W = this.width;
							H = this.height;
							//console.log(W, H)
							if(++loaded == Nub * 2) {
								loadedSucc();
							}
						};

						oImg.src = 'images/small/' + i + '.jpg';
					}
				
				

				function loadedSucc() {

					var oParent = document.getElementById('div1');
					var iNow = -1;
					var oPrev = document.getElementById('prev');
					var oNext = document.getElementById('next');

					var tw = oParent.offsetWidth * 0.9; 
					var th = oParent.offsetHeight * 0.9; 
					var tl = oParent.offsetWidth * 0.05; 
					var tt = oParent.offsetHeight * 0.05; 
					var dw = W;
					var dh = H;
					var a = (tw - Cell * dw) / (Cell + 1);
					var b = (th - Row * dh) / (Row + 1); 
					var k = 1;
					var clicked = false;
					var aDiv = oParent.getElementsByTagName('div');

					for(var j = 0; j < Row; j++) {
						for(var i = 0; i < Cell; i++, k++) {
							var oDiv = document.createElement('div'); //创建div
							oDiv.index = k;
							oDiv.mm_left = parseInt(tl + a + i * (dw + a)); 
							//console.log(oDiv.mm_left)
							oDiv.mm_top = parseInt(tt + b + j * (dh + b)); 
							oDiv.mm_bg = 'url(images/small/' + k + '.jpg)';
							oDiv.mm_Row = j;
							oDiv.mm_Cell = i;
							oDiv.style.top = -Math.random() * 300 - 200 + 'px';
							oDiv.style.width = dw + 'px';
							oDiv.style.height = dh + 'px';
//							oDiv.style.border='none';
//							oDiv.style.borderRadius=50+'%';
							oDiv.style.background = oDiv.mm_bg;
							oDiv.innerHTML = '<span></span>';
							oParent.appendChild(oDiv);
						}
					}

					var ready = false;
					 function timer() {
						var ii = aDiv.length - 1;
						var timer = setInterval(function() {
							aDiv[ii].style.left = aDiv[ii].mm_left + 'px';
							aDiv[ii].style.top = aDiv[ii].mm_top + 'px';
							setStyle3(aDiv[ii], 'transform', 'rotate(' + (Math.random() * 40 - 20) + 'deg)');

							aDiv[ii].onclick = function() {
								if(!ready) return;
								var _this = this;
								if(clicked) {//这是图片被选中时
									(function() {
										for(i = 0; i < aDiv.length; i++) {
											var oSpan = aDiv[i].getElementsByTagName('span')[0];

											setStyle3(aDiv[i], 'transform', 'rotate(' + (Math.random() * 40 - 20) + 'deg)');
											aDiv[i].style.left = aDiv[i].mm_left + 'px';
											aDiv[i].style.top = aDiv[i].mm_top + 'px';
											oSpan.style.filter = 'alpha(opacity:0)';
											oSpan.style.opacity = 0;
											aDiv[i].className = '';
										}
										oPrev.style.display = oNext.style.display = 'none';
									})();
								} else {
									(function() {
										var ll = (oParent.offsetWidth - BW) / 2;
										var tt = (oParent.offsetHeight - BH) / 2;

										iNow = _this.index - 1;

										for(i = 0; i < aDiv.length; i++) {
											var oSpan = aDiv[i].getElementsByTagName('span')[0];
											oSpan.style.background = 'url(images/' + _this.index + '.jpg) ' + -aDiv[i].mm_Cell * dw + 'px ' + -aDiv[i].mm_Row * dh + 'px';
											setStyle3(aDiv[i], 'transform', 'rotate(0)');
											aDiv[i].style.left = ll + aDiv[i].mm_Cell * (dw + 1) + 'px';
											aDiv[i].style.top = tt + aDiv[i].mm_Row * (dh + 1) + 'px';
											oSpan.style.filter = 'alpha(opacity:100)';
											oSpan.style.opacity = 1;

											aDiv[i].className = 'active';
										}
										oPrev.style.display = oNext.style.display = 'block';
									})();
								}

								clicked = !clicked;
							};

							ii--;
							if(ii == -1) {
								clearInterval(timer);
								
								ready = true;
							}
						}, 100);
					};//zheshanle
					
					//雪花
					function create(){
		               for(var i=0;i<100;i++){
		                    var img = document.createElement("img")
		                    img.src="images/xue.png"
		                    var m = Math.random()*window.innerWidth
		                    img.style.left=m+"px"
		                    
		                    img.className="small"
		                    sec.appendChild(img)
		
		               }
		               for(var i=0;i<100;i++){
		                    var img = document.createElement("img")
		                    img.src="images/xue.png"
		                    var m = Math.random()*window.innerWidth
		                    img.style.left=m+"px"
		                    
		                    img.className="smallM"
		                   	sec.appendChild(img)
		
		               }
		               for(var i=0;i<100;i++){
		                    var img = document.createElement("img")
		                    img.src="images/xue.png"
		                    var m = Math.random()*window.innerWidth
		                    img.style.left=m+"px"
		                    
		                    img.className="smallB"
		                    sec.appendChild(img)
		
		               }
          			}
				 
		          function re(){
		               var i=0 
		               timeF1=setInterval(function(){    
		               var ran =Math.floor(Math.random()*imgs.length)       
		                    mTween(imgs[ran],{top:700},6000,"linear",function(){
		                     imgs[ran].style.top=-20+"px"                                         
		                   }) 
		                                                 
		               },20)
		                         
		          }
					
					//点击铃铛开启个定时器
					Bell.onclick=function(){
						mTween(oTiao,{top:50},800,'backBoth',function(){
							mTween(oTiao,{top:-15},3000,'backBoth')
							clearTimeout(timers);
							Bell.onclick="";
						});
//						mTween(Bg,{height:660},2000,'backOut');
						timers=setTimeout(function(){
							timer();
							create()
							re();
						},300)
					}
					//按上下按钮切换图片
					oPrev.onclick = oNext.onclick = function() {
						if(this == oPrev) {
							iNow--;
							if(iNow == -1) {
								iNow = Nub - 1;
							}
						} else {
							iNow++;
							if(iNow == Nub) {
								iNow = 0;
							}
						}

						var arr = [];
						for(i = 0; i < Nub; i++) arr[i] = i;
						arr.sort(function() {
							return Math.random() - 0.5;
						});
						var timer = setInterval(function() {
							var item = arr.pop();

							aDiv[item].getElementsByTagName('span')[0].style.background = 'url(images/' + (iNow + 1) + '.jpg) ' + -aDiv[item].mm_Cell * dw + 'px ' + -aDiv[item].mm_Row * dh + 'px';
							//这里是每个span小块在大图片上的坐标位置
							if(!arr.length) clearInterval(timer);
						}, 20);
					};
				}

				function setStyle3(obj, name, value) {
					obj.style['Webkit' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
					obj.style['Moz' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
					obj.style['ms' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
					obj.style['O' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
					obj.style[name] = value;
				}

		})(document);