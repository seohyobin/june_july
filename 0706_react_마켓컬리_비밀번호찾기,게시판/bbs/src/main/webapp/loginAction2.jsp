<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <% 
		request.setCharacterEncoding("UTF-8");
	%>
	<%@ page import ="bbs.UserDAO" %>
	
	<jsp:useBean id="UserDTO" class="bbs.UserDTO" scope="page"/>
	<jsp:setProperty name="UserDTO" property="userId"/>
	<jsp:setProperty name="UserDTO" property="userPw"/>
	
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<% 
	if (UserDTO.getUserId()== null || UserDTO.getUserPw()== null  ){
	%>
	<script>
		alert('빈값은 허용하지 않습니다.');
		history.go(-1);
	</script>
	
	<% 
	}
	else{
		UserDAO userDAO = new UserDAO();
		int result = userDAO.login(UserDTO.getUserId(), UserDTO.getUserPw());
		
		if(result==1){
			//로그인 세션(session)의 속성(Attribute)을 설정(setter)하기
			//session.setAttribute("세션이름 키(아이디)",세션 값 키값)(아이디);
			session.setAttribute("userId",UserDTO.getUserId());
			//세션 가져오기

	%>
			<script>alert('로그인 완료');</script>
	<% 		
		}
		else if(result==0){
	%>
			<script>
			alert('비밀번호 틀림');
			history.go(-1);
			</script>
	<%	
		}
		else if(result==-1){
	%>
			<script>
			alert('아이디 틀림');
			history.go(-1);
			</script>
	<%
		}
		else{
	%>
			<script>
			alert('DB이상');
			</script>
	<%
		}
	}
	%>
</body>
</html>