<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "kurly.UserDAO" %>
<%@ page import = "kurly.UserDTO" %>
<%
	request.setCharacterEncoding("UTF-8");
%> 


<%
	// 이름 입력상자, 이메일 입력상자 유효성검사 
	if( (request.getParameter("user_pw")==null || request.getParameter("user_pw2")==null )){
			
		%> 
			<script>
				alert("비밀번호가 빈 값이 있습니다. 다시 시도하세요.");
				history.go(-1);
			</script>
		<%	
	}
	else if( ((request.getParameter("user_pw")==null) != (request.getParameter("user_pw2")==null ))){
		%> 
		<script>
			alert("비밀번호가 일치하지않습니다. 다시 시도하세요.");
			history.go(-1);
		</script>
	<%	
	}
	else{
		// DAO 클래스 인스턴스 생성하고 
		// 아이디찾기함수() 를 호출실행(매개변수 이름, 이메일) 
		// 결과는 UserDTO().아이디찾기함수(파라미터1, 파라미터2) 로 반환받는다.
		UserDAO userDAO = new UserDAO();
		//int result=userDAO.pwSearch(request.getParameter("user_pw"), request.getParameter("user_id"));
		int result = userDAO.pwReset("asdfasdfasdf","1234526789");
		if(result==-1){
		%> 
			<script>
				alert("아이디 휴대폰 입력값을 확인하고 다시 보내주세요. ");
				history.go(-1);
			</script>
		<%	
		}
		else{
			
		
	%>
			<script>
				alert("비밀번호가 변경되었습니다.");
				history.go(-1);
			</script>
			
<%
		}
	}
%>









