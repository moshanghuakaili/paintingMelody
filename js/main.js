//撤销的array
//画布
	//var picpath = 'source/picture/000001.jpg';
	var canvas ;
	var context ;
	//蒙版
	var canvas_bak;
	var context_bak;

	var canvasWidth = 960;
	var canvasHeight = 580;
	/*var canvasHeight = 800;
	var canvasWidth = 800;*/
	var cancelList = new Array();
	//撤销的次数
	var cancelIndex = 0;

	var imageData_bak;
	var imageData;
	/**/
	var fillList = new Array();
	$("input#volume-acoustic").on("change",function(){
        sound.volume =$(this).val()/100;
        console.log(sound.volume)
        if($(this).val()>50){
           if($(".icon-volume-down")){
                $(".icon-volume-down").removeClass("icon-volume-down").addClass("icon-volume-up");
            }
            if($(".icon-volume-off")){
                $(".icon-volume-off").removeClass("icon-volume-off").addClass("icon-volume-up");
            }
        }
        else if($(this).val()==0){
            if($(".icon-volume-down")){
                $(".icon-volume-down").removeClass("icon-volume-down").addClass("icon-volume-off");
            }
            if($(".icon-volume-up")){
                $(".icon-volume-up").removeClass("icon-volume-up").addClass("icon-volume-off");
            }
        }
        else{
            if($(".icon-volume-off")){
                $(".icon-volume-off").removeClass("icon-volume-off").addClass("icon-volume-down");
            }
            if($(".icon-volume-up")){
                $(".icon-volume-up").removeClass("icon-volume-up").addClass("icon-volume-down");
            }
        }
    })
	// var color=[225,20,50,255];
	$(function(){
		initCanvas();
		$(".rubber").on("click",function(){
			color=[255,255,255,255];
		});
		$(".clearContext").on("click",function(){
			importImg();
		});
		/*$(".save").on("click",function(){
			save();
			$("body,html").animate({scrollTop:550},200);
		});*/
		$("#downloadImage").on("click",function(){
			$("#downloadImage")[0].href=canvas.toDataURL();
		});

		/*$(".showColor").bigColorpicker(function(el,icolor){
			var sColorChange = [];
	        for(var i=1; i<7; i+=2){
	            sColorChange.push(parseInt("0x"+icolor.slice(i,i+2)));        
	        }
			sColorChange.push(255);
			color=sColorChange;
		});*/
		//$("#f333").bigColorpicker("f3","L",6);
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
		//var fileName = "source/picture/bug.png";
		var fileName = picpath;
		var  image = new Image();
		$("#canvas_bak").css("opacity",0);
		image.src =  fileName ;
		image.onload = function(){
			// 居中缩放
			context.drawImage(image , 0 ,0 , image.width , image.height , 0 , 0 , canvasWidth , canvasHeight);
		}
		
	    
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
		//console.log(color)
		var scroolTop = $(window).scrollTop();
		var scroolLeft = $(window).scrollLeft();
		var canvasTop = $(canvas).offset().top - scroolTop;
		var canvasLeft = $(canvas).offset().left - scroolLeft;
		var startX = parseInt(event.clientX - canvasLeft);
		var startY = parseInt(event.clientY - canvasTop);
		imageData = context.getImageData(0,0,canvasWidth,canvasHeight);
		imageData_bak = context_bak.getImageData(0,0,canvasWidth,canvasHeight);
		var point=startY*canvasWidth+startX;
		var oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];
		//var backColor=[252,188,188,255];
		var backColor=[bgColor[0],bgColor[1],bgColor[2],255];
		if(isBandary(oriColor)){
		}
		else{
			if(compareColor(color,oriColor)){
				return 

			}
			else if(compareColor(oriColor,backColor)){
				return 
			}
			else{
				fillList = [];
				setFill(startX,startY);
				changeMusic(colorIndex);
			}
		}
		
		context_bak.putImageData(imageData_bak,0,0)
        var im=new Image()
        im.src = canvas_bak.toDataURL();
		im.onload = function(){
			context.drawImage(im , 0 ,0 , canvasWidth , canvasHeight , 0 ,0 , canvasWidth , canvasHeight);
			clearContext();
		}
		console.log(sound);
		//picDeal();
	}
	var setFill = function(startX,startY){
		
	/*	var color = [230,69,52,255];*/
		var point=startY*canvasWidth+startX;
		var oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];
		//var backColor=[252,188,188,255];
		var backColor=[bgColor[0],bgColor[1],bgColor[2],255];
		//console.log(oriColor)
		if(isBandary(oriColor)){
			return
		}
		else{
			if(compareColor(color,oriColor)){
				/*console.log("oriColor")*/
				return 

			}
			else if(compareColor(oriColor,backColor)){
				/*console.log("backColor")*/
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
	var changeMusic = function(colorIndex){
		console.log(sound1.volume)
		var Index=parseInt(colorIndex);
		//console.log(colorIndex)
		switch(Index){
			case(0):
			//console.log("000000")
				if(sound1.playing){
					if(sound1.volume<0.3){
						sound1.volume=sound1.volume*1.05;
						if(sound2.volume<0.1){
							sound2.stop();
						}
						else{
							sound2.volume=sound2.volume/1.05;
						}
						if(sound3.volume<0.1){
							sound3.stop();
						}
						else{
							sound3.volume=sound3.volume/1.05;
						}
						if(sound4.volume<0.1){
							sound4.stop();
						}
						else{
							sound4.volume=sound4.volume/1.05;
						}
						if(sound5.volume<0.1){
							sound5.stop();
						}
						else{
							sound5.volume=sound5.volume/1.05;
						}
						if(sound6.volume<0.1){
							sound6.stop();
						}
						else{
							sound6.volume=sound6.volume/1.05;
						}
						if(sound7.volume<0.1){
							sound7.stop();
						}
						else{
							sound7.volume=sound7.volume/1.05;
						}
					}
				}
				else{
					sound1.volume=0.05;
					sound1.play();
				}
				break;
			case(1):
				//console.log("000001")
				if(sound2.playing){
					if(sound2.volume<0.4){
						sound2.volume=sound2.volume*1.1;
						if(sound1.volume<0.05){
							sound1.stop();
						}
						else{
							sound1.volume=sound1.volume/1.05;
						}
						if(sound3.volume<0.1){
							sound3.stop();
						}
						else{
							sound3.volume=sound3.volume/1.05;
						}
						if(sound4.volume<0.1){
							sound4.stop();
						}
						else{
							sound4.volume=sound4.volume/1.05;
						}
						if(sound5.volume<0.1){
							sound5.stop();
						}
						else{
							sound5.volume=sound5.volume/1.05;
						}
						if(sound6.volume<0.1){
							sound6.stop();
						}
						else{
							sound6.volume=sound6.volume/1.05;
						}
						if(sound7.volume<0.1){
							sound7.stop();
						}
						else{
							sound7.volume=sound7.volume/1.05;
						}
					}
				}
				else{
					sound2.volume=0.1;
					sound2.play();
				}
				break;
			case(2):
				if(sound3.playing){
					if(sound3.volume<0.4){
						sound3.volume=sound3.volume*1.05;
						if(sound1.volume<0.05){
							sound1.stop();
						}
						else{
							sound1.volume=sound1.volume/1.05;
						}
						if(sound2.volume<0.1){
							sound2.stop();
						}
						else{
							sound2.volume=sound2.volume/1.05;
						}
						if(sound4.volume<0.1){
							sound4.stop();
						}
						else{
							sound4.volume=sound4.volume/1.05;
						}
						if(sound5.volume<0.1){
							sound5.stop();
						}
						else{
							sound5.volume=sound5.volume/1.05;
						}
						if(sound6.volume<0.1){
							sound6.stop();
						}
						else{
							sound6.volume=sound6.volume/1.05;
						}
						if(sound7.volume<0.1){
							sound7.stop();
						}
						else{
							sound7.volume=sound7.volume/1.05;
						}
					}
				}
				else{
					sound3.volume=0.1;
					sound3.play();
				}
				break;
			case(3):
				if(sound4.playing){
					if(sound4.volume<0.4){
						sound4.volume=sound4.volume*1.05;
						if(sound2.volume<0.1){
							sound2.stop();
						}
						else{
							sound2.volume=sound2.volume/1.05;
						}
						if(sound3.volume<0.1){
							sound3.stop();
						}
						else{
							sound3.volume=sound3.volume/1.05;
						}
						if(sound1.volume<0.05){
							sound1.stop();
						}
						else{
							sound1.volume=sound1.volume/1.05;
						}
						if(sound5.volume<0.1){
							sound5.stop();
						}
						else{
							sound5.volume=sound5.volume/1.05;
						}
						if(sound6.volume<0.1){
							sound6.stop();
						}
						else{
							sound6.volume=sound6.volume/1.05;
						}
						if(sound7.volume<0.1){
							sound7.stop();
						}
						else{
							sound7.volume=sound7.volume/1.05;
						}
					}
				}
				else{
					sound4.volume=0.1;
					sound4.play();
				}
				break;
			case(4):
				if(sound5.playing){
					if(sound5.volume<0.4){

						sound5.volume=sound5.volume*1.05;
						if(sound2.volume<0.1){
							sound2.stop();
						}
						else{
							sound2.volume=sound2.volume/1.05;
						}
						if(sound3.volume<0.1){
							sound3.stop();
						}
						else{
							sound3.volume=sound3.volume/1.05;
						}
						if(sound4.volume<0.1){
							sound4.stop();
						}
						else{
							sound4.volume=sound4.volume/1.05;
						}
						if(sound1.volume<0.05){
							sound1.stop();
						}
						else{
							sound1.volume=sound1.volume/1.05;
						}
						if(sound6.volume<0.1){
							sound6.stop();
						}
						else{
							sound6.volume=sound6.volume/1.05;
						}
						if(sound7.volume<0.1){
							sound7.stop();
						}
						else{
							sound7.volume=sound7.volume/1.05;
						}
					}
				}
				else{
					sound5.volume=0.1;
					sound5.play();
				}
				break;
			case(5):
				if(sound6.playing){
					if(sound6.volume<0.5){

						sound6.volume=sound6.volume*1.1;
						if(sound2.volume<0.1){
							sound2.stop();
						}
						else{
							sound2.volume=sound2.volume/1.05;
						}
						if(sound3.volume<0.1){
							sound3.stop();
						}
						else{
							sound3.volume=sound3.volume/1.05;
						}
						if(sound4.volume<0.1){
							sound4.stop();
						}
						else{
							sound4.volume=sound4.volume/1.05;
						}
						if(sound1.volume<0.05){
							sound1.stop();
						}
						else{
							sound1.volume=sound1.volume/1.05;
						}
						if(sound5.volume<0.1){
							sound5.stop();
						}
						else{
							sound5.volume=sound5.volume/1.05;
						}
						if(sound7.volume<0.1){
							sound7.stop();
						}
						else{
							sound7.volume=sound7.volume/1.05;
						}
					}
				}
				else{
					sound6.volume=0.1;
					sound6.play();
				}
				break;
			case(6):
				if(sound7.playing){
					if(sound7.volume<0.4){

						sound7.volume=sound7.volume*1.05;
						if(sound2.volume<0.1){
							sound2.stop();
						}
						else{
							sound2.volume=sound2.volume/1.05;
						}
						if(sound3.volume<0.1){
							sound3.stop();
						}
						else{
							sound3.volume=sound3.volume/1.05;
						}
						if(sound4.volume<0.1){
							sound4.stop();
						}
						else{
							sound4.volume=sound4.volume/1.05;
						}
						if(sound1.volume<0.05){
							sound1.stop();
						}
						else{
							sound1.volume=sound1.volume/1.05;
						}
						if(sound5.volume<0.1){
							sound5.stop();
						}
						else{
							sound5.volume=sound5.volume/1.05;
						}
						if(sound6.volume<0.1){
							sound6.stop();
						}
						else{
							sound6.volume=sound6.volume/1.05;
						}
					}
				}
				else{
					sound7.volume=0.1;
					sound7.play();
				}
				break;
		}
	}
	var isBandary = function(color){
		if(color[0]<35&&color[1]<35&&color[2]<35){
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
	var picDeal = function(){
		console.log("picDeal")
		imageData = context.getImageData(0,0,canvasWidth,canvasHeight);
		imageData_bak = context_bak.getImageData(0,0,canvasWidth,canvasHeight);
		
		for(var i=0;i<960*680;i++){
			//console.log(imageData_bak.data[i*4],imageData_bak.data[i*4+1],imageData_bak.data[i*4+2],imageData.data[i*4+3])
			if(imageData.data[i*4]<190&&imageData.data[i*4+1]<190
				&&imageData.data[i*4+2]<190&&imageData.data[i*4+3]>200){
							imageData_bak.data[i*4]=30;
							imageData_bak.data[i*4+1]=30;
							imageData_bak.data[i*4+2]=30;
							imageData_bak.data[i*4+3]=255;
					
			}
			else{
							imageData_bak.data[i*4]=255;
							imageData_bak.data[i*4+1]=255;
							imageData_bak.data[i*4+2]=255;
							imageData_bak.data[i*4+3]=255;
			}
		}
		context_bak.putImageData(imageData_bak,0,0)
        var im=new Image()
        im.src = canvas_bak.toDataURL();
		im.onload = function(){
			context.drawImage(im , 0 ,0 , canvasWidth , canvasHeight , 0 ,0 , canvasWidth , canvasHeight);
			clearContext();
		}
	}
