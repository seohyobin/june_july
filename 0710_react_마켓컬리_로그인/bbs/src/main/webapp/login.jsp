<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<style type="text/css">
*{margin: 0; padding: 0; vertical-align: middle; box-sizing: border-box;}

		ul {list-style:none;}
		a {color:#333;text-decoration:none;}
#login{width: 100%;padding: 80px 0 80px 0;}
#login .container{ width: 100%; max-width: 500px; margin: 0 auto; background-color: #f0f0f0; padding: 100px 20px;}
#login .container .title{padding: 0 0 50px 0 ; text-align: center;}
#login .container .title h2{ font-size:40px;}
#login .container .content{width: 100%;}
#login .container .content form{width: 100%;}
#login .container .content form ul{width: 100%; list-style: none}
#login .container .content form ul li{width: 100%; padding: 8px 0}
#login .container .content form ul li input{width: 100%; height: 60px; padding: 0 0 0 15px; font-size: 16px;}
#login .container .content .btn-box{text-align: right;}
#login .container .content .btn-box button{width: 200px; height: 50px; font-size: 15px;}

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
		
	<% 
		//로그인정보=> 세션가져오기
		String userId=null;
		if((String)session.getAttribute("userId")!=null){
			userId =(String)session.getAttribute("userId");
		}
		
	%>
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
				<% 
				if(userId==null){	
				%>
				<a href="./signup.jsp">
					SIGNUP
				</a>
				<a href="./login.jsp">
					LOGIN
				</a>
				<% 
					}
				else{
				%>
				<a href="./logoutAction.jsp">
					LOGOUT
				</a>
				<% 	
				}
				%>

			</div>
		</div>
	</header>
<div id="login">
	<div class="container">
		<div class="title">
			<h2>♡로그인♡</h2>
		</div>
		<div class="content">
			<form action="./loginAction.jsp" method="post">
			<ul>
				<li><input maxlength="16" type="text" name="userId" id="userId" placeholder="아이디를 입력하세요"></li>
				<li><input maxlength="16" type="text" name="userPw" id="userPw" placeholder="비밀번호를 입력하세요"></li>
			</ul>
			<div class="search-box">
				<a href="./idSearchForm.jsp">아이디찾기</a><i>|</i>
				<a href="./pwSearchForm.jsp">비밀번호찾기</a>
			</div>
				<div class="btn-box">
					<button type="submit">전송</button>
				</div>
			</form>
		</div>
	
	</div>

</div>
</body>
</html>