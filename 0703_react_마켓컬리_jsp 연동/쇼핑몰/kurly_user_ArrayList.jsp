<%@
    page language = "java"
    contentType = "text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%@ page import = "java.util.*"%>

<%
    request.setCharacterEncoding("UTF-8");
%>



<%

    ArrayList<String> list =new ArrayList<>();
    list.add("딸기");
    list.add("사과");
    list.add("자몽");
    list.add("체리");
    list.add("수박");
    list.set(4,"포도");
    list.remove(1);
    //list.clear();

    out.println("<hr>");
    out.println(list); 
    

    out.println(list); out.println("<ol>");

        for(String item : list){
            out.println("<li>" + item +"</li>");
        }
        out.println("</ol>");



    out.println("<ol>");

        for(int i = 0; i<list.size(); i++){
            out.println("<li>" + list.get[i] +"</li>");
        }
        out.println("</ol>");

%>