<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import ="bbs.BbsDAO" %>
<%@ page import ="bbs.BbsDTO"%>
<%@ page import ="bbs.UserDAO" %>
<%@ page import ="java.util.ArrayList"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시판 목록</title>

<style type="text/css">

h1{font-size: 28px; text-align: center;}
table {
	width: 1000px;
	border-collapse: collapse;
	max-width: 1000px;
	margin: 0 auto;
}
table td:nth-child(2){width:650px; padding: 0 50px 0 20px; white-space: nowrap;overflow: hidden;}
tbody{
text-align:center;} 
th {
	height: 50px;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
}
}
td{
	height: 50px;
	border: 1px solid #eee;
}
div{text-align:  right; 	
	max-width: 1000px;
	margin: 0 auto;}
button{
width:150px;
height: 50px;
border: 0;
}
</style>
</head>
<body>
	<h1>게시판 메인페이지</h1>
	<table>
		<thead>
			<tr>
				<th>글번호</th>
				<th>제목</th>
				<th>작성자 </th>
				<th>작성일</th>
			</tr>
		</thead>
		<tbody>
		<%
			BbsDAO bbsDAO = new BbsDAO();
			ArrayList<BbsDTO> list =bbsDAO.getList();
			for(int i=0; i<list.size(); i++){
		%>
		
			<tr>
				<td><%=list.get(i).getBbsId()%></td>
				<td><a href="viewAction.jsp?bbsId=<%=list.get(i).getBbsId() %>"> <%=list.get(i).getSubject()%> </a></td>
				<td><%=list.get(i).getUserId()%></td>
				<td><%=list.get(i).getWriteDate()%></td>
			</tr>
			
		<%
			}
		%>
		
		</tbody>
	</table>
	<div>
		<button>게시판 목록</button>
	</div>
	
</body>
</html>