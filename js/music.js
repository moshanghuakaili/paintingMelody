(function() {
    //prepareAPI
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
    try {
        this.audioContext = new AudioContext();
    } catch (e) {
        this._updateInfo('!Your browser does not support AudioContext', false);
        console.log(e);
    }


    for(var i=0;i<colorSet.length;i++){
        var thiscolor="rgb("+colorSet[i].data[0][0]+","+colorSet[i].data[0][1]+","+colorSet[i].data[0][2]+")";
        $(".styleList .colorList").append("<li data-index="+(i+1)+" style='background:"+thiscolor+"'>"+colorSet[i].name+"</li>");
        
    }
    var colorSetIndex=0;
    $(".styleList .colorList li").on("click",function(){
        colorSetIndex=parseInt($(this).attr("data-index"));
        $(".styleList .nowColor").css("border-color",$(this).css("background-color"));
        
        if(colorSetIndex==0){
            $("body").css("background-color","#e1ccdb");
        }
        else{
            var thiscolor="rgb("+colorSet[colorSetIndex-1].data[10][0]+","+colorSet[colorSetIndex-1].data[10][1]+","+colorSet[colorSetIndex-1].data[10][2]+")";
            $("body").css("background-color",thiscolor);
        }
        //clearContext(1);
        importImg()
    })
    // var picpath = 'source/picture/a01-3.png';
    var canvas ;
    var context ;
    //蒙版
    var canvas_bak;
    var context_bak;

    /*var canvasWidth = 800;
    var canvasHeight = 800;*/
    var canvasWidth = 960;
    var canvasHeight = 580;
    var imageData_bak;
    var imageData;
    var fillList = new Array();
    var color;

    ctx = new AudioContext();
    xml = new XMLHttpRequest();
    xml.responseType = 'arraybuffer';
    xml.open('GET', musicpath, true);
    //xml.open('GET', "source/audio/001.mp3", true);
    xml.onload = function() {
        ctx.decodeAudioData(
            xml.response,
            function(_data) {
                data = _data;
                var bufferSource;
	            bufferSource = ctx.createBufferSource();
                var analyser = ctx.createAnalyser();
                bufferSource.connect(analyser);
                //connect the analyser to the destination(the speaker), or we won't hear the sound

                var gain = ctx.createGain();
                analyser.connect(gain);
                gain.connect(ctx.destination);
                gain.gain.value = 1;
                //analyser.connect(ctx.destination);
                //then assign the buffer to the buffer source node
	            bufferSource.buffer = data;
                bufferSource.loop = true;
	            
	            
	            //bufferSource.playbackRate.value = frequencyRatio;
	            //bufferSource.connect(ctx.destination);
	           
                bufferSource.start(0);
                drawSpectrum(analyser);
                $("input#volume-acoustic").on("change",function(){
                    gain.gain.value =$(this).val()/100;
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
                  // æ’­æ”¾ä¸¤ä¸ªä¸»éŸ³è°ƒ:
                /*var startTime = ctx.currentTime + 0.100;
                  var tempo = 80; // BPM (beats per minute)
                  var eighthNoteTime = (60 / tempo) / 2;
                  for (var bar = 0; bar < 2; bar++) {
                    var time = startTime + bar * 8 * eighthNoteTime;
                    // æ’­æ”¾æ‰“å‡»éŸ³1å’Œ5
                    var source = ctx.createBufferSource();
                    source.buffer = data;
                    source.connect(ctx.destination);
                    source.start(time);

              
                    //console.log(time)
                   
                  }*/
	            },
	            function(e) {
	                alert(e.err);
            }
        );
    };

    /*  var startTime = ctx.currentTime + 0.100;
      var tempo = 80; // BPM (beats per minute)
      var eighthNoteTime = (60 / tempo) / 2;

      // æ’­æ”¾ä¸¤ä¸ªä¸»éŸ³è°ƒ:
      for (var bar = 0; bar < 2; bar++) {
        var time = startTime + bar * 8 * eighthNoteTime;
        // æ’­æ”¾æ‰“å‡»éŸ³1å’Œ5
        bufferSource.start(time)
       
      }*/

    xml.send();
    var x=0,y=0;
    var drawSpectrum=function(analyser){
        animationId = requestAnimationFrame(drawMeter);
    }
    var drawMeter=function(){
        //console.log(imageData);
        imageData = context.getImageData(0,0,canvasWidth,canvasHeight);
        imageData_bak = context_bak.getImageData(0,0,canvasWidth,canvasHeight);
        var im=new Image()
        /*if(x<960){
            x+=40;
        }
        if(y<580){
            y+=20;
        }*/
        x=Math.floor(Math.random()*960);
        y=Math.floor(Math.random()*580);
        if(colorSetIndex==0){
            color=[Math.floor(Math.random()*50)*4+50,Math.floor(Math.random()*50)*4+50,Math.floor(Math.random()*50)*4+50,255]
        }
        else{
            color=colorSet[colorSetIndex-1].data[Math.floor(Math.random()*10)];
        }
        handleClick(x,y);
        im.src = canvas_bak.toDataURL();
        im.onload = function(){
            context.drawImage(im , x ,y , x+1 , y+1 , x ,y , x+1 , y+1);
            clearContext();
        }
        animationId = requestAnimationFrame(drawMeter);
    }
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
        $("#canvas_bak").css("display","none");
        
        //context.clearRect(0,0,canvasWidth,canvasHeight);
        image.src =  fileName ;
        image.onload = function(){
            // 居中缩放
           context.drawImage(image , 0 ,0 , image.width , image.height , 0 , 0 , canvasWidth , canvasHeight);
        }
  
    }
    initCanvas();
    var handleClick = function(x,y){
        imageData = context.getImageData(0,0,canvasWidth,canvasHeight);
        imageData_bak = context_bak.getImageData(0,0,canvasWidth,canvasHeight);
        var point=y*canvasWidth+x;

        var oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];
        
        /*
        var backColor=[252,188,188,255];*/
        var backColor=[bgColor[0],bgColor[1],bgColor[2],255];
    
        /**/
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
                setFill(x,y);
            }
        }
        
        context_bak.putImageData(imageData_bak,0,0)
        var im=new Image()
        im.src = canvas_bak.toDataURL();
        im.onload = function(){
            context.drawImage(im , 0 ,0 , canvasWidth , canvasHeight , 0 ,0 , canvasWidth , canvasHeight);
            clearContext();
        }
        /*picDeal()*/
    }
    var setFill = function(startX,startY){
        
    /*  var color = [230,69,52,255];*/
        var point=startY*canvasWidth+startX;
        var oriColor=[imageData.data[point*4],imageData.data[point*4+1],imageData.data[point*4+2],imageData.data[point*4+3]];
        // var backColor=[252,188,188,255];
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
    var isBandary = function(color){
        if(color[0]<35&&color[1]<35&&color[2]<35){
            return true;
        }
        else{
            return false;
        }   
    }
    var compareColor = function(color1,color2){
        for(var i=0;i<3;i++){
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
    $("#downloadImage").on("click",function(){
        $("#downloadImage")[0].href=canvas.toDataURL();
    });
})();

