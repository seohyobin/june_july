<%@
    page language = "java"
    contentType = "text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%
    request.setCharacterEncoding("UTF-8");
%>



<%

    String fruits[]= request.getParameterValues("chk");
    out.println("<ol>");

    for(String item : fruits){
        out.println("<li>" + item +"</li>");
    }
    out.println("</ol>");

%>