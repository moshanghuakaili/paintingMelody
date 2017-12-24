<!DOCTYPE html> 
<html> 
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<link rel="stylesheet" type="text/css" href="css/reset.css">
		<link rel="stylesheet" href="css/canvas.css" type="text/css" />
		<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
	</head>
	<?php
		require('php/dbConnect.php');
		$conn=dbConnect();

		$sql="SELECT * FROM music ORDER BY  RAND() LIMIT 1";
		/*echo $sql;*/
		$result=$conn->query($sql);
		if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				echo "<script type='text/javascript'> musicpath='".$row["musicAddr"]."';</script>";
			}
		}else{
			echo "no result";
		}
		$sql="SELECT * FROM pic where picComplex!='easy'  ORDER BY  RAND() LIMIT 1";
		/*echo $sql;*/
		$result=$conn->query($sql);
		if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				echo "<script type='text/javascript'> picpath='".$row["picAddr"]."'; bgColor=[".$row["picOriColorR"].",".$row["picOriColorG"].",".$row["picOriColorB"]."];</script>";
			}
		}else{
			echo "no result";
		}
		$conn->close();

	?>
	<body> 
		<div class="container">
			<header>
				<div class="headerContainer">
					<p class="logo"></p>
					<a href="index.php" class="headerOp "><span class="icon-home"></span> 主页 · Home</a>
					<a href="musicPage.php" class="headerOp select"><span class="icon-music"></span> 音 · Melody</a>
					<a href="paintingPage.php" class="headerOp"><span class="icon-pencil"></span> 画 · Painting</a>
				</div>
				<div class="headerControl">
					<span class="controlSlider">
						<span class="icon-volume-up musicVolume"> </span>
                        <input type="range" min="0" max="100" value="100" id="volume-acoustic"/>
					</span>
					<span class="controlPic">
						<a href="musicPage.php" class="icon-refresh controlPicIcon"></a>
						<a download="picture.png" id="downloadImage" class="icon-cloud-download controlPicIcon"></a>
					</span>
					
				</div>
				<div class="foot">
					<p>作者: 李婷</p>
					<p>学号：3130104869</p>
					<p>指导老师：彭韧</p>
					<p>专业：数字媒体技术</p>
				</div>
			</header>
			<div class="paintingContainer">
				<div id="draw">
					<div class="canvas_container" >
						<canvas id="canvas">
							浏览器不支持
						</canvas>
						<canvas id="canvas_bak"></canvas>
						<!-- <div class="canvasOver"></div> -->
					</div>
				</div>
				<div class="styleList">
					<span class="nowColor"></span>
					<ul class="colorList">
						<li data-index=0 style="background: rgb(208,171,191)">碎</li>
					</ul>
				</div>
			</div>	
			
		</div>
		<script type="text/javascript" src="js/jquery-3.2.0.min.js"></script>
		<script type="text/javascript" src="js/jquery.bigcolorpicker.js"></script>
		<script type="text/javascript" src="js/Pizzicato.js"></script>
		<script type="text/javascript" src="js/colorIni.js"></script>
		<script type="text/javascript" src="js/music.js"></script>
		<script type="text/javascript">
			$(function(){

			})
		</script>
	</body> 
</html> 