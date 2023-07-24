<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@ page import ="bbs.BbsDAO" %>
    
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
<title>Insert title here</title>
</head>
<body>
<h1>글쓰기 액션 파일</h1>


	<% 
	//로그인정보=> 세션가져오기
	String userId=null;
	if((String)session.getAttribute("userId")!=null){
		userId =(String)session.getAttribute("userId");
	}
	
	if(userId==null){
		%>
		<script>
		alert('로그인하세여');
		location.href='./login.jsp';
		</script>
	<%
	}
	else{
	%>

	
			<%
			if (BbsDTO.getSubject()== null  || BbsDTO.getContent()== null ){//입력 제목 내용 빈값이 아니면
			%>
			<script>
				alert('빈값');
				history.go(-1);
			</script>
			
			<% 
			}
			else{
				BbsDAO bbsDAO = new BbsDAO();
				int result = bbsDAO.write(userId,BbsDTO.getSubject(),BbsDTO.getContent());
				 						//로그인 아이디로 글쓰기
				if(result ==-1){ //db오류
			%>
					<script>
					alert('DB오류');
					history.go(-1);
					</script>
			<% 
				}
				else{ //글쓰기 정상
			%>
					<script>
					alert('글쓰기 성공');
					history.go(-1); //글목록 이동
					</script>
			<% 
				}//글쓰기 성공여부 조건문
				
			}//DTO 입력 값 빈값 조건문 끝 
			
	}//세션 조건문 여기서 끝나~
	%>
</body>
</html>