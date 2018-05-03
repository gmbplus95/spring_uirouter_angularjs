<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Home</title>
<base href="/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="css/style.css">
<script src="js/angular.js"></script>
<script src="js/myApp.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.16/angular-ui-router.js"></script>
</head>
<body ng-cloak>

		<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">IFI</a>
			</div>
			<ul class="nav navbar-nav">
				<li><a ui-sref="home">Home</a></li>
				<li><a ui-sref="student">Student Page</a></li>
				<li><a ui-sref="course">Course Page</a></li>
			</ul>
		</div>
		</nav>
		<div class="container">
			<ui-view></ui-view>
		</div>

</body>
</html>