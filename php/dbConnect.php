<?php
function dbConnect(){
	$servername="localhost";
	$username="root";
	$password="123456";
	$dbname="painting"; 
	// 创建连接
	$conn= new mysqli($servername,$username,$password,$dbname);
	if($conn->connect_error){
		die("fail: " . $conn->connect_error);
	} 
	else{
		return $conn;
	}
}
?>