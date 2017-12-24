var wWidth;
var wHeight;
$(function(){
	var r,g,b;
	var opx,opy,copx,copy,topx;
	var bgw;
	var canMove=false;
	reInit();
	$(window).resize(function() { 
		reInit();
	})

	var highPassFilter = new Pizzicato.Effects.HighPassFilter({
	    frequency: 400,
	    peak: 10
	});
	var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
	    frequency: 400,
	    peak: 10
	});
	var sound = new Pizzicato.Sound({ 
    	source: 'file',
    	options: { 
    		path: musicpath ,
    		loop:true,
    		volume:1 
    	},
	}, function() {
		sound.play();
	});

	$(".siteTitle").bind("mouseover",function(){
		$(this).css("opacity","0");
		$(".siteControl").css("opacity","1");
		$(this).css("z-index","0");
		
	})
	
	$(".siteControl").bind("mouseover",function(){
		$(".siteTitle").css("opacity","0");
		$(".siteControl").css("opacity","1");
		$(".siteTitle").css("z-index","0");
	})
	$(".siteControl").bind("mouseleave",function(){
		$(this).css("opacity","0");
		//$(this).find(".siteControlMiddle").css("color","#fff");
		$(".siteTitle").css("opacity","1");
		$(".siteTitle").css("z-index","4");
		$(".inSiteControl").find("span:gt(0)").css("color","#fff");
	})
	$(".inSiteControl").bind("mousedown",mouseDown)
	$(".siteControlMiddle").bind("mousemove",mouseMove);
	$(".siteControlMiddle").bind("mouseup",function(e){
		canMove=false;
	})
	function mouseDown(e){
		opx=e.pageX;
		opy=e.pageY;
		copx=$(".inSiteControl").position().left; 
		copy=$(".inSiteControl").position().top; 
		topx=$(".siteTitle").offset().left;
		bgw=$(".frontContainer").width();
		//$(".siteControl").css("background","#ccc")
		canMove=true;
	}
	function mouseMove(e){
		if(canMove){
			var px=e.pageX-opx;
			var py=e.pageY-opy;
			$(".inSiteControl").css("left",(copx+px)+"px");
			$(".inSiteControl").css("top",(copy+py)+"px");
			$(".frontContainer").width(bgw+px);
			$(".siteTitle").css("left",(topx+px)+"px");
			r=(copx+180+px)/2;
			g=(copy+py+200)/2;
			b=(420-(copx+px))/2;
			//console.log(r,g,b)
			$(".inSiteControl").find(".siteControlMiddle").css("color","rgb("+r+","+g+","+b+")");

			if(px>0){
				$(".inSiteControl").find(".siteControlRight").css("color","rgb("+r+","+g+","+b+")");
				$(".inSiteControl").find(".siteControlLeft").css("color","#fff");
			}
			else if(px<0){
				$(".inSiteControl").find(".siteControlRight").css("color","#fff");
				$(".inSiteControl").find(".siteControlLeft").css("color","rgb("+r+","+g+","+b+")");
			}
			else{
				$(".inSiteControl").find(".siteControlLeft").css("color","#fff");
				$(".inSiteControl").find(".siteControlRight").css("color","#fff");
			}
			if(py>0){
				$(".inSiteControl").find(".siteControlDown").css("color","rgb("+r+","+g+","+b+")");
				$(".inSiteControl").find(".siteControlUp").css("color","#fff");
			}
			else if(py<0){
				$(".inSiteControl").find(".siteControlDown").css("color","#fff");
				$(".inSiteControl").find(".siteControlUp").css("color","rgb("+r+","+g+","+b+")");
			}
			else{
				$(".inSiteControl").find(".siteControlUp").css("color","#fff");
				$(".inSiteControl").find(".siteControlDown").css("color","#fff");
			}
			
			if(copy+py+160>230){
				lowPassFilter.frequency=(460-copy-py)*5;
				if(sound.effects.indexOf(highPassFilter)>=0){
					sound.addEffect(lowPassFilter);
					sound.removeEffect(highPassFilter);
				}
				if(sound.effects.indexOf(lowPassFilter)<0){
					sound.addEffect(lowPassFilter);
				}
				console.log(lowPassFilter.frequency)
			}
			else if(copy+py+160<230){
				highPassFilter.frequency=(copy+py+160)*3;
				if(sound.effects.indexOf(lowPassFilter)>=0){
					sound.removeEffect(lowPassFilter);
					sound.addEffect(highPassFilter);
				}
				if(sound.effects.indexOf(highPassFilter)<0){
					sound.addEffect(highPassFilter);
				}
				console.log('highPassFilter')
				console.log(highPassFilter.frequency)
			}
			else{
				if(sound.effects.indexOf(lowPassFilter)>=0){
					sound.removeEffect(lowPassFilter);
				}
				if(sound.effects.indexOf(highPassFilter)>=0){
					sound.removeEffect(highPassFilter);
				}
			}
			sound.volume=(copx+px+110)/550;
			frequency=(300-(copy+py))*2;
			highPassFilter.frequency=frequency;
		}	
	}
	function reInit(){
		/*var r=$(".siteControlMiddle").offset().top;
		var g=$(".siteControlMiddle").offset().left;*/
		$(".container").height($(document).height());
		$(".frontContainer").width($(".container").width()/2);
		$(".siteTitle").css("left",($(".container").width()/2-100)+"px");
		$(".siteTitle").css("top",($(".container").height()/2-230)+"px");
		$(".siteControl").css("left",($(".container").width()/2-215)+"px");
		$(".siteControl").css("top",($(".container").height()/2-230)+"px");
		$(".siteLink").css("left",($(".container").width()/2-215)+"px");
		$(".siteLink").css("top",($(".container").height()/2-230)+"px");
	}
	function setRGB(left,top){
		
	}
})