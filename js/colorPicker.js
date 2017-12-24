$(function(){
	var colorYellow = [
		[247,240,64,255],
		[255,233,0,255],
		[247,181,0,255],
		[243,152,1,255],
		[244,164,103,255],
		[216,189,160,255]
	];

	var colorRed = [
		[235,84,31,255],
		[224,101,93,255],
		[229,0,31,255],
		[215,24,120,255],
		[233,97,135,255],
		[236,156,193,255]
	];

	var colorPurple = [
		[181,78,121,255],
		[165,46,140,255],
		[119,25,101,255],
		[82,45,141,255],
		[93,39,89,255],
		[186,159,202,255]
	];

	var colorBlue = [
		[0,65,151,255],
		[11,52,104,255],
		[88,188,238,255],
		[0,106,148,255],
		[1,104,183,255],
		[96,149,201,255]
	];

	var colorGreen = [
		[1,126,132,255],
		[1,92,75,255],
		[3,119,58,255],
		[11,169,94,255],
		[61,175,51,255],
		[171,205,5,255],
	];

	var colorEarth = [
		[110,103,28,255],
		[75,69,47,255],
		[98,75,57,255],
		[177,91,54,255],
		[183,120,53,255],
		[210,159,5,255]
	];

	var colorLight = [
		[211,211,211,255],
		[216,203,160,255],
		[150,180,201,255],
		[187,211,195,255],
		[239,198,206,255],
		[220,182,206,255]
	]
	colorPickerSet=[
		colorRed,
		colorYellow,
		colorPurple,
		colorBlue,
		colorGreen,
		colorEarth,
		colorLight
	]
	color=colorPickerSet[0][0];
	colorIndex=0;
	var colorCon="rgb("+color[0]+","+color[1]+","+color[2]+")";
	$(".colorPicker .colorPicked").css("border-color",colorCon)
	for(var i=0;i<colorPickerSet.length;i++){
		var appendContent='';
		var colorCon="rgb("+colorPickerSet[i][0][0]+","+colorPickerSet[i][0][1]+","+colorPickerSet[i][0][2]+")";
		appendContent+="<li class='colorSet'><p style='background:"+colorCon+"' class='colorSet"+i+"' data-colorSet="+i+"></p>";
		appendContent+="<ul class='colorList'>"
		for(var j=0;j<colorPickerSet[i].length;j++){
			var colorCon="rgb("+colorPickerSet[i][j][0]+","+colorPickerSet[i][j][1]+","+colorPickerSet[i][j][2]+")";
			appendContent+="<li class='colorBox' data-color="+j+" data-colorSet="+i+"><span style='background:"+colorCon+"'></span></li>";
		}
		appendContent+="</ul></li>";
		$(".colorSetList").append(appendContent);
	}
	$(".colorPicker .colorSetList li p").on("mouseover",function(){
		$(this).next().css("display","block")
	})
	$(".colorPicker .colorSetList li p").on("mouseout",function(){
		$(this).next().css("display","none")
	})
	$(".colorPicker .colorSetList li ul").on("mouseover",function(){
		$(this).css("display","block")
	})
	$(".colorPicker .colorSetList li ul").on("mouseout",function(){
		$(this).css("display","none")
	})
	$(".colorPicker .colorSetList li p").on("click",function(){
		colorIndex=$(this).attr("data-colorSet");
		color=colorPickerSet[colorIndex][0];
		var colorCon="rgb("+color[0]+","+color[1]+","+color[2]+")";
		$(".colorPicker .colorPicked").css("border-color",colorCon)
	})
	$(".colorPicker .colorSetList li ul li").on("click",function(){
		colorIndex=$(this).attr("data-colorSet");
		colorIndexLi=$(this).attr("data-color");
		color=colorPickerSet[colorIndex][colorIndexLi];
		var colorCon="rgb("+color[0]+","+color[1]+","+color[2]+")";
		$(".colorPicker .colorPicked").css("border-color",colorCon)
	})
})

