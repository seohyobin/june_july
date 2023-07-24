<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import ="bbs.UserDAO" %>

<%
	request.setCharacterEncoding("UTF-8");
%>

<jsp:useBean id="UserDTO" class="bbs.UserDTO"  scope="page"/>
<jsp:setProperty name="UserDTO" property="userId"/>
<jsp:setProperty name="UserDTO" property="userPw"/>
<jsp:setProperty name="UserDTO" property="userName"/>
<jsp:setProperty name="UserDTO" property="userEmail"/>

    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		if(UserDTO.getUserId()== null || UserDTO.getUserPw()== null || UserDTO.getUserName()== null ){
	%>	
		<script>
			alert('아이디 비밀번호 이름은 필수입력사항입니다.');
			history.go(-1);
		</script>
	
	
	<%
		}
		else{
			UserDAO userDAO = new UserDAO();
		 	int result=	userDAO.signup(UserDTO); //모든 입력 값 하나의 아규먼트로 매개변수 전달
		 	if(result == -1){
	%>
		 	
		 	<script>
				alert('이미 입력된 아이디 입니다.');
				history.go(-1);
			</script>
	<%
	
		 	}
		 	else{
	%>
	 		<script>
				alert('회원가입이 완료되었습니다.');
				history.go(-1);
			</script>
	<%
		 	}//회원가입여부 체크
		}//유효성 체크 조건문
	%>
	

</body>
</html>