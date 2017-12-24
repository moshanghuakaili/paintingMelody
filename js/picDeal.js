//撤销的array
//画布
	var picpath = 'source/picture/001-1.jpg';
	var canvas ;
	var context ;
	//蒙版
	var canvas_bak;
	var context_bak;

	var canvasWidth = 960;
	var canvasHeight = 580;

	var cancelList = new Array();
	//撤销的次数
	var cancelIndex = 0;

	var imageData_bak;
	var imageData;
	var fillList = new Array();
	var color=[225,20,50,255];
	$(function(){
		initCanvas();
		$(".rubber").on("click",function(){
			color=[255,255,255,0];
		});
		$(".clearContext").on("click",function(){
			importImg();
		});
		$(".save").on("click",function(){
			save();
			$("body,html").animate({scrollTop:550},200);
		});
		$(".downloadImage").on("click",function(){
			downloadImage();
		});
		$(".showColor").bigColorpicker(function(el,icolor){
			var sColorChange = [];
	        for(var i=1; i<7; i+=2){
	            sColorChange.push(parseInt("0x"+icolor.slice(i,i+2)));        
	        }
			sColorChange.push(255);
			color=sColorChange;
		});
		//$("#f333").bigColorpicker("f3","L",6);
		$(canvas_bak).bind('click',handleClick);
		$(canvas_bak).bind('click',handleClick);
	});

	//初始化
	var initCanvas = function(){
		canvas =  document.getElementById("canvas");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		context = canvas.getContext('2d');

		canvasTop = $(canvas).offset().top;
		canvasLeft = $(canvas).offset().left;

		canvas_bak =  document.getElementById("canvas_bak");
		canvas_bak.width = canvasWidth;
		canvas_bak.height = canvasHeight;
		context_bak = canvas_bak.getContext('2d');

		importImg();
	}

	var importImg = function(){

		var reader = new FileReader();
		var fileName = picpath;
		var  image = new Image();
		$("#canvas_bak").css("opacity",0);
		image.src =  fileName ;
		image.onload = function(){
			// 居中缩放
			context.drawImage(image , 0 ,0 , image.width , image.height , 0 , 0 , canvasWidth , canvasHeight);
		}
	    
	}
	//下载图片
	var downloadImage = function(){
		console.log("downLoad")
		$("#downloadImage_a")[0].href=canvas.toDataURL();
	}

	//撤销上一个操作
	var cancel = function(){
		cancelIndex++;
		context.clearRect(0,0,canvasWidth,canvasHeight);
		var  image = new Image();
		var index = cancelList.length-1 - cancelIndex  ;
		var url = cancelList[index];
		image.src = url;
		image.onload = function(){
			context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
		}
	}

	//重做上一个操作
	var next = function(){
		cancelIndex--;
		context.clearRect(0,0,canvasWidth,canvasHeight);
		var  image = new Image();
		var index = cancelList.length-1 - cancelIndex  ;
		var url = cancelList[index];
		image.src = url;
		image.onload = function(){
			context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
		}
	}

	var handleClick = function(event){
		var scroolTop = $(window).scrollTop();
		var scroolLeft = $(window).scrollLeft();
		var canvasTop = $(canvas).offset().top - scroolTop;
		var canvasLeft = $(canvas).offset().left - scroolLeft;
		var startX = event.clientX - canvasLeft;
		var startY = event.clientY - canvasTop;
		imageData = context.getImageData(0,0,canvasWidth,canvasHeight);
		imageData_bak = context_bak.getImageData(0,0,canvasWidth,canvasHeight);
		var point=startY*canvasWidth+startX;
		var oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];
		if(isBandary(oriColor)){
		}
		else{
			fillList = [];
			setFill(startX,startY);
		}
		
		context_bak.putImageData(imageData_bak,0,0)
        var im=new Image()
        im.src = canvas_bak.toDataURL();
		im.onload = function(){
			context.drawImage(im , 0 ,0 , canvasWidth , canvasHeight , 0 ,0 , canvasWidth , canvasHeight);
			clearContext();
		}
	}

	var setFill = function(startX,startY){
		
	/*	var color = [230,69,52,255];*/
		var point=startY*canvasWidth+startX;
		var oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];

		if(isBandary(oriColor)){
			return
		}
		else{
			if(compareColor(color,oriColor)){
				return 
			}
			else{
				imageData_bak.data[point*4]=color[0];
				imageData_bak.data[point*4+1]=color[1];
				imageData_bak.data[point*4+2]=color[2];
				imageData_bak.data[point*4+3]=color[3];
				fillList.push(point);
				if(startX+1<canvasWidth&&!isInArray(startX+1,startY)){
					setFill(startX+1,startY);
				}
				if(startX-1>=0&&!isInArray(startX-1,startY)){
					setFill(startX-1,startY);
				}
				if(startY+1<canvasHeight&&!isInArray(startX,startY+1)){
					setFill(startX,startY+1);
				}
				if(startY-1>=0&&!isInArray(startX,startY-1)){
					setFill(startX,startY-1);
				}
			}
			
		}
		
		
		// point=startY*canvasWidth+startX+1
		// oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];
	}
	var isBandary = function(color){
		if(color[0]<100&&color[1]<100&&color[2]<100&&color[3]>200){
			return true;
		}
		else{
			return false;
		}	
	}
	var compareColor = function(color1,color2){
		for(var i=0;i<4;i++){
			if(color2[i]!=color1[i]){
				return false
			}
		}
		return true;
	}

	var isInArray = function(x,y){
		var point=canvasWidth*y+x;
		for(var a = 0;a<fillList.length;a++){
			if(point==fillList[a]){
				return true;
			}
		}
		return false;
	}
	var clearContext = function(type){
	if(!type){
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}else{
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}
}
