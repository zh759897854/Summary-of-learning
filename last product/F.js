(function(){
	var wrap=document.querySelector('.wrap');		
	var bigS=document.querySelector('.bigS');		
	var samll=document.querySelector('.samll');
	var spans=samll.children;
	console.log(samll)
	bigS.onmouseover=function(){
		if(bigS.className=="active"){
			bigS.className="active";
		}else{
			bigS.className="hover";
		}			
	}
	bigS.onmouseout=function(){
		if(bigS.className=="active"){
			bigS.className="active";
			wrap.style.height=0;
			wrap.style.margin=0;
		}else{
			bigS.className="bigS";
		}			
	}
	cube.onclick=function(){
		bigS.className="active";			
		wrap.style.height=0;
		wrap.style.margin=0;
		samll.className="none";
		for(var i=0;i<spans.length;i++){
			spans[i].style.display="none";
		}
	}	
})();