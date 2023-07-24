<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "bbs.BbsDAO" %> 
<%@ page import = "bbs.BbsDTO" %> 
<%@ page import = "java.util.ArrayList" %> 
<%
	request.setCharacterEncoding("UTF-8");
%>      
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시판 메인</title>

	
</head>
<body>

<div id="bbsList">
	
	
	<table>
		<caption>BBS BOARD</caption>
		<thead>
			<tr>
				<th>번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>작성일</th>
			</tr>			
		</thead>
		
		<tbody>
		<%
			BbsDAO bbsDAO = new BbsDAO(); 
		    ArrayList<BbsDTO> list = bbsDAO.getList();
			for(int i=0; i<list.size(); i++){
		%>

			<tr>
				<td><%=list.get(i).getBbsId() %></td>
				<td><a href="viewAction.jsp?bbsId=<%=list.get(i).getBbsId() %>"><%=list.get(i).getSubject() %></a></td>
				<td><%=list.get(i).getUserId() %></td>
				<td><%=list.get(i).getWriteDate() %></td>
			</tr>
						
		<%
			}
		%>
					
		</tbody>
		
	</table>
		
	
</div>
	
	<style type="text/css">
		* {margin:0; padding:0; vertical-align:center;box-sizing:border-box;}
		ul {list-style:none;}
		a {color:#333;text-decoration:none;}
		
		#bbsList {width:100%;padding:100px 0; text-align:center;}
		#bbsList table {width:100%;max-width:1000px;margin:0 auto;border-collapse:collapse;}
		#bbsList table caption {width:100%;padding: 0 0 60px 0;font-size:24px;font-weight:600}
				
		#bbsList table th,td {border-bottom:1px solid #eee;}		
		#bbsList table th {height:60px;background:#f4f4f4;color:#222;font-size:16px;}
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
		
	</style>

</body>
</html>