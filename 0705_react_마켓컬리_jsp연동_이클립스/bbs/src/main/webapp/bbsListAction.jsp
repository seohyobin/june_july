<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    

<%@ page import = "bbs.BbsDTO" %> 
<%@ page import = "java.util.ArrayList" %> 
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
<title>게시판 메인</title>

	
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
	

<div id="bbsList">
	<div class="container">

	
	<table>
		<caption>BBS BOARD</caption>
		<thead>	
			<tr>
				<th>번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>작성일</th>
				<th>조회수</th>
			</tr>			
		</thead>
		
		<tbody>
		<%
			int pageNumber=1; //기본값 첫 페이지
			//다음페이지 클릭하면 보내진 쿼리스트링의 겟파라미터 키 pageNumber
			//파라미터가 비어있지 않으면 파라미터 값을 가져와서 
			//pageNumber 변수에 값을 대입(저장)한다.
			if(request.getParameter("pageNumber")!=null){
				pageNumber= Integer.parseInt(request.getParameter("pageNumber"));
			}
			
			BbsDAO bbsDAO = new BbsDAO(); 
		    ArrayList<BbsDTO> list = bbsDAO.getList(pageNumber);
			for(int i=0; i<list.size(); i++){
		%>
			<tr>
				<td><%=list.get(i).getBbsId() %></td>
				<td><a href="viewAction.jsp?bbsId=<%=list.get(i).getBbsId() %>"><%=list.get(i).getSubject() %></a></td>
				<td><%=list.get(i).getUserId() %></td>
				<td><%=list.get(i).getWriteDate() %></td>
				<td><%=list.get(i).getHit() %></td>
			</tr>	
		<%
			}
			
		%>	
		</tbody>
		
	</table>
		</div>
	<div class="pagebtn-box">
	<%
		if(pageNumber!=1){
	%>
			<a class="prev-btn"  href="./bbsListAction.jsp?pageNumber=<%=pageNumber-1%>">이전</a>

	<%
		}
	%>
			

	<%  

		int totalRecords= bbsDAO.totalRecordsMethod();
	
		int viewList = 3;
		//double pages = totalRecords/viewList; // 4...3...
		int viewGroup = 2;
		int pages = (int)Math.ceil(totalRecords/(double)viewList);
		int group = (int)Math.ceil(pages/(double)viewGroup);
		int cnt = 1;
		int startNum = (cnt-1)*viewGroup;
		int endNum = startNum+viewGroup;
		for(int i=0; i<=endNum; i++ ){
	%>
	
			<a class="page" href="./bbsListAction.jsp?pageNumber=<%=i+1%>"><%= i+1 %></a>
			
	<% 
		}
	%>
	
	
		
	<%
		if(bbsDAO.nextPage(pageNumber+1)){
	%>
			<a class="next-btn"  href="./bbsListAction.jsp?pageNumber=<%=pageNumber+1%>">다음</a>
	<%
		}
	%>
		
	</div>
	
	<% 
	if(userId!=null){	
	%>
	<div class="submit" style="text-align:right;">
	<a href="./write.jsp"> 
		<button style="width:120px; height:50px; " type="submit">글쓰기</button>
	</a>
	</div>
	<%
		}
	%>
		
	
</div>

	
	<style type="text/css">
		* {margin:0; padding:0; vertical-align:center;box-sizing:border-box;}
		ul {list-style:none;}
		a {color:#333;text-decoration:none;}
		
		#bbsList {width:100%;padding:100px 0; text-align:center;}
		#bbsList .container {width:100%; max-width:80%; margin: 0 auto; padding: 50px; background-color:#f3f3f3; }
		#bbsList table {width:100%;margin:0 auto;border-collapse:collapse;}
		#bbsList table caption {width:100%;padding: 0 0 60px 0;font-size:24px;font-weight:600}
				
		#bbsList table th,td {border-bottom:1px solid #eee;}		
		#bbsList table th {height:60px;background:#fff;color:#222;font-size:16px;}
		#bbsList table td {height:50px;background:#fff;color:#444;font-size:15px;text-align:center;}		
		#bbsList table th:nth-child(1) {width:80px;}
		#bbsList table th:nth-child(2) {width:650px;}	
		#bbsList table th:nth-child(3) {width:120px;}
		#bbsList table th:nth-child(4) {width:150px;}
		#bbsList table tr:nth-child(even) td {background:#fcfcfc;}
		#bbsList table th {border-top:2px solid #444;border-bottom:1px solid #444;}		
		

		#bbsList table td:nth-child(2) {text-align:left;}			
		#bbsList table td:nth-child(4) {font-size:14px;color:#999;}			
		#bbsList table td a {			
			padding: 0 0 0 20px;
			white-space:nowrap;
			overflow: hidden;			
			display:block;			
			max-width:590px;
			text-overflow:ellipsis;
			transition: all 0.3s;			
		}
		#bbsList table td a:hover {color:#5f0080;}
		
		#bbsList .pagebtn-box {padding: 30px 0 ; text-align:center;}
		#bbsList .pagebtn-box a{display: inline-flex; width:30px; height: 30px; border: 1px solid #ddd; font-size: 14px; align-items: center; justify-content: center;}
		#bbsList .pagebtn-box a .prev-btn{width: 50px; margin: 0 10px 0 0 ;  color: #ddd}
		#bbsList .pagebtn-box a .next-btn{width: 50px; margin: 0 0 0 10px ; color: #ddd}
		#bbsList .pagebtn-box a .page{width: 50px; margin: 0 0 0 10px ; border:1px solid #eee; color: #ddd}
		
	
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

</body>
</html>