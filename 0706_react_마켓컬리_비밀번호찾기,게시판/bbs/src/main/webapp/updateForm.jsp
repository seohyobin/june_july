<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "bbs.BbsDAO" %>
<%@ page import = "bbs.BbsDTO" %>

<%
	request.setCharacterEncoding("UTF-8");
%> 


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<%
	//로그인 정보 => 세션 가져오기
	String userId = null;
	if(session.getAttribute("userId")!=null){ // 세션값이 비어있지 않으면 세션아이디 변수에 저장
	userId = (String)session.getAttribute("userId");  // 세션정보가져오기
	}

	if(userId == null){//로그아웃 상태
%>	
		<script>
			alert("로그인하세요 \n 회원만이 글을 쓸수 있습니다.");
			location.href="./login.jsp";
		</script>
<%	
	}	
	else{//1.로그인 상태이면
		 //2.글번호 유효성
		int bbsId = 0; // 현재는 수정할 글 번호가 없는 샛팅
		if(request.getParameter("bbsId")!=null ){//update 이전 상태 즉 글보기 상태에서 던져준 글 번호
			bbsId = Integer.parseInt(request.getParameter("bbsId")); // 글번호 가져오기
		}
		if(bbsId==0){//수정할 글 번호가 없다. 
		%>
			<script>	
				alert("수정 가능한 글이 없습니다.");
				location.href='./bbsListAction.jsp';
			</script>
		<%	
		}
		else{//2-3수정할 글 번호가 있다.
			//3.글보기 내용을 가져와서 화면폼에 데이터를 바인딩한다.
			////화면 폼에 데이터를 바인딩하여 수정하고 전송(action)한다.
			//글보기 내용을 가져온수정컨트롤러인(DAO) 업데이트 함수를(update(매개변수 글번호 제목 내용 작성일을 전달하여)) 호출하여 수정할 데이터를 가져온다.
			// -> 수정 완료!!! 수정액션파일.jsp
				BbsDTO bbsDTO = new BbsDAO().getView(bbsId);	
				if(bbsDTO==null){  //3-1.null이면 데이터가 없다면
					%>
					<script>
						alert("수정할 데이터가 없습니다."); 
						location.href='./bbsListAction.jsp';
					</script>
					<%		
				}
				else{//3-2.null 아니면 데이터가 있다면
				//4.현재 데이터 글 번호에 해당하는 아이디가 일치 확인
					if(!userId.equals(bbsDTO.getUserId())){ //로그인 아이디와 해당글 아이디를 비교 다르면 
					%>
						<script>
							alert("수정할 권한이 없습니다."); // 작성자 본인만이 수정 가능하다.
							location.href='./bbsListAction.jsp';
						</script>
					<%		
					}
					else{
						// html 뷰 탬플릿 폼에 수정내용을 바인딩한다.
					%>	
						<header id='header'>
							<div class="container" >
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
						<div id="write">
						 	<div class="container2">
						 		<div class="title">
						 			<h1 style="text-align:center; margin:100px 0 0 0 ;">♡글수정♡</h1>
						 		</div>
						 		<div class="content">
						 			<div id="write" style="width:800px; margin :50px auto;">
										<form action="./updateAction.jsp?bbsId=<%=bbsId%>" id="wirte" name="wirte" method="post">
											<ul style="list-style:none;">
												<li style="margin: 0 0 20px 0;">
													<input style="width:100%; height:50px; " type="text" name="subject" id="subject" placeholder="제목을 입력하세요" value="<%=bbsDTO.getSubject()%>">
												</li>
												<li style="margin: 0 0 20px 0;">
													<textarea style="width:100%; height:250px; " name="content" id="content"  ><%=bbsDTO.getContent()%></textarea>
												</li>
											</ul>
										<div class="submit" style="text-align:right;">
											<button style="width:120px; height:50px; " type="submit">수정 등록</button>
										</div>
									</form>
						 		</div>
							</div>
						</div>
					</div>
					<%
					}
					
				}
			
		}
		
	}
	
%>


</body>
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
</html>