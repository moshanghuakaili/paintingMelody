<!DOCTYPE html> 
<html> 
	<head>
		<meta charset="utf-8">
		<title>画音</title>
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<link rel="stylesheet" type="text/css" href="css/reset.css">
		<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<style type="text/css">
			.container header{
				background: #8085e7;
			    left: -160px;
			    display: block;
			    opacity: 0.8;
			    transition-property:left,background;
				-moz-transition-property: left,background; /* Firefox 4 */
				-webkit-transition-property:left,background; /* Safari 和 Chrome */
				-o-transition-property:left,background; /* Opera */
				transition-duration: 0.2s;
				-moz-transition-duration: 0.2s; /* Firefox 4 */
				-webkit-transition-duration: 0.2s; /* Safari 和 Chrome */
				-o-transition-duration: 0.2s; /* Opera */

			}
			.container header:hover{
				background: #efefef;
			    left: 0px;
			}
		</style>
	</head>
	<?php
		require('php/dbConnect.php');
		$conn=dbConnect();

		$sql="SELECT * FROM music ORDER BY  RAND() LIMIT 1";
		/*echo $sql;*/
		$result=$conn->query($sql);
		if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				echo "<script type='text/javascript'>musicpath='".$row["musicAddr"]."';</script>";
			}
		}else{
			echo "no result";
		}
		$conn->close();
	?>
	<body> 
		<div class="container">
			<!-- <header>
				<div class="headerContainer">
					<a href="index.php" class="icon-home select"></a>
					<a href="musicPage.php" class="icon-music "></a>
					<a href="paintingPage.php" class="icon-pencil "></a>
					<span class="tips">Tips</span>
					<p class="tipsIndex">1.鼠标悬浮于“画音”之上可以会出现音乐调节器<br/>2.在框型区域中单击拖动调节器可以调节音乐音量及音乐效果，调节器颜色也会随之变化</p>
				</div>
			</header> -->
			<header >
				<div class="headerContainer">
					<p class="logo"></p>
					<a href="index.php" class="headerOp select"><span class="icon-home"></span> 主页 · Home</a>
					<a href="musicPage.php" class="headerOp "><span class="icon-music"></span> 音 · Melody</a>
					<a href="paintingPage.php" class="headerOp "><span class="icon-pencil"></span> 画 · Painting</a>
				</div>
				<div class="foot">
					<p>作者: 李婷</p>
					<p>学号：3130104869</p>
					<p>指导老师：彭韧</p>
					<p>专业：数字媒体技术</p>
				</div>
			</header>
			<div class="backContainer">
				<div class="frontContainer">
				
				</div>
			</div>
			<div class="siteTitle">
				画<br/>音
			</div>
			<!-- <div class="siteLink">
				<span class="paintingLink"></span>
				<span class="musicLink"></span>
			</div> -->
			<div class="siteControl">
				<div class="inSiteControl">
					<span class="siteControlMiddle icon-circle-blank"></span>
					<span class="siteControlLeft icon-angle-left"></span>
					<span class="siteControlUp icon-angle-up"></span>
					<span class="siteControlRight icon-angle-right"></span>
					<span class="siteControlDown icon-angle-down"></span>
				</div>
			</div>
			
		</div>
		<script type="text/javascript" src="js/jquery-3.2.0.min.js"></script>
		<script type="text/javascript" src="js/Pizzicato.js"></script>
		<script type="text/javascript" src="js/index.js"></script>
		<!-- <script type="text/javascript" src="js/audio.js"></script> -->

	</body> 
</html> 