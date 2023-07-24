<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "bbs.BbsDAO" %>
<%@ page import = "bbs.BbsDTO" %>
<%
	request.setCharacterEncoding("UTF-8");
%> 

>  

<%
					int bbsId = 0; 
					if(request.getParameter("bbsId")!=null ){
						bbsId = Integer.parseInt(request.getParameter("bbsId")); // 글번호 가져오기
					}

						BbsDAO bbsDAO = new BbsDAO();
						int result = bbsDAO.delete(bbsId);
						out.println(result);
%>	
	
</body>
</html>