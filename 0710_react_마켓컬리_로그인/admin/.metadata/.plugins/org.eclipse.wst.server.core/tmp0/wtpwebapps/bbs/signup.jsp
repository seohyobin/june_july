<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   
   
   <%@ page import = "bbs.BbsDAO" %> 
<%
	request.setCharacterEncoding("UTF-8");
%>      

<jsp:useBean id="BbsDTO" class="bbs.BbsDTO" scope="page"/>
<jsp:setProperty name="BbsDTO" property="userId"/>
<jsp:setProperty name="BbsDTO" property="subject"/>
<jsp:setProperty name="BbsDTO" property="content"/>
   
   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<style type="text/css">
*{margin: 0; padding: 0; vertical-align: middle; box-sizing: border-box;}
#signup{width: 100%;padding: 80px 0 80px 0;}
#signup .container{ width: 100%; max-width: 800px; margin: 0 auto;}
#signup .container .title{padding: 0 0 50px 0 ; text-align: center;}
#signup .container .title h2{ font-size:28 px;}
#signup .container .content{width: 100%;}
#signup .container .content form{width: 100%;}
#signup .container .content form ul{width: 100%;}
#signup .container .content form ul li{width: 100%; padding: 8px 0}
#signup .container .content form ul li input{width: 100%; height: 60px; padding: 0 0 0 15px; font-size: 18px;}
#signup .container .content .btn-box{text-align: right;}
#signup .container .content .btn-box button{width: 200px; height: 50px; font-size: 15px;}

	.container1{display:flex; align-items: center; max-width: 1200px; margin: 0 auto; justify-content: space-between; padding: 0 0 20px 0;}
	.left{display:flex;align-items: center; }
	h2{font-size: 50px; padding: 0 15px 0 0; font-weight: 600; }
	textarea {resize: none;}
	a{padding: 0 15px 0 0; font-size: 16px; font-weight: 500; color: #000;}
	a:link{text-decoration: none;}
	a:visited{text-decoration:none;}
	a:focus{text-decoration: none;}
	a:hover{text-decoration: none;}
	
	#header{width: 100%; height: 80px; background: #f0f0f0;}


</style>
</head>
<body>

	<header id='header'>
		<div class="container1" >
			<div class="left">
				<h2>○.○</h2>
					<a href="./admin.jsp">
						HOME
					</a>
					<a href="./bbsListAction.jsp">
					BOARD
					</a>
			</div>
			<div class="right">
		
				<a href="./signup.jsp">
					SIGNUP
				</a>
				<a href="./login">
					LOGIN
				</a>
		
				<a href="./logoutAction.jsp">
					LOGOUT
				</a>

			</div>
		</div>
	</header>
<div id="signup">
	<div class="container">
		<div class="title">
			<h1>관리자 회원가입</h1>
		</div>
		<div class='content'>
			<form action="./signupAction.jsp" id="signuform" method="post">
				<ul style="list-style:none">
					<li>
						<input type="text" id="user_id" name="userId" placeholder="아이디를 입력하세요">
					</li>
					<li>
						<input type="text" id="user_pw" name="userPw" placeholder="비밀번호를 입력하세요">
					</li>
					<li>
						<input type="text" id="user_name" name="userName" placeholder="이름를 입력하세요">
					</li>
					<li>
						<input type="text" id="user_email" name="userEmail" placeholder="이메일를 입력하세요">
					</li>
				</ul>
				<div class="btn-box">
					<button type="submit">
						회원가입
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
</body>
</html>