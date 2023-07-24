<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "kurly.UserDAO" %>
<%@ page import = "kurly.UserDTO" %>
<%
	request.setCharacterEncoding("UTF-8");
%> 


<%
	// 이름 입력상자, 이메일 입력상자 유효성검사 
	if( request.getParameter("user_name")==null || request.getParameter("user_hp")==null ){
	out.println("이름과 이메일을 입력값을 입력하고 다시 시도하세요!");
	}
	else{
		// DAO 클래스 인스턴스 생성하고 
		// 아이디찾기함수() 를 호출실행(매개변수 이름, 이메일) 
		// 결과는 UserDTO().아이디찾기함수(파라미터1, 파라미터2) 로 반환받는다.
		UserDTO userDTO = new UserDAO().idSearch(request.getParameter("user_name"), request.getParameter("user_hp"));
	
		if(userDTO==null){ // 찾는데 실패!
			out.println(userDTO);
		}
		else{ // 찾음 => 검색 결과 아이디를 검색결과.jsp 에 쿼리스트링 파라미터로 보내준다.
			
			out.println(userDTO.getUser_id());
		}
		
	}
%>
{"":"<%=userDTO.getUser_id() %>"}









