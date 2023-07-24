<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
    <jsp:useBean id="BbsDTO" class="bbs.BbsDTO" scope="page"/>
	<jsp:setProperty name="BbsDTO" property="userId"/>
	<jsp:setProperty name="BbsDTO" property="subject"/>
	<jsp:setProperty name="BbsDTO" property="content"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Write</title>
<style type="text/css">
*{margin: 0; padding: 0; vertical-align: middle; box-sizing: border-box;}
	.container{display:flex; align-items: center; max-width: 1200px; margin: 0 auto; justify-content: space-between; padding: 0 0 20px 0;}
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
		//로그인 성공한 회원만 글을 쓸 수 있도록 제한조건을 구현한다.
		
	%>
	<header id='header'>
		<div class="container" >
			<div class="left">
				<h2>○.○</h2>
					<a href="./main.jsp">
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
				<a href="./login">
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
	<div id="logout">
	 	<div class="container2">
	 		<div class="title">
	 			<h1 style="text-align:center; margin:100px 0 0 0 ;">logout</h1>
	 		</div>
	 		<div class="content" style="text-align: center;">
	 		<% 
	 				session.invalidate();
	 		%>
	 		<script type="text/javascript">
	 			alert('로그아웃');
	 			location.href='./admin.jsp'
	 		</script>

	 		</div>
	 	</div>
	</div>
	<br>
	<br>
	
</body>
</html>