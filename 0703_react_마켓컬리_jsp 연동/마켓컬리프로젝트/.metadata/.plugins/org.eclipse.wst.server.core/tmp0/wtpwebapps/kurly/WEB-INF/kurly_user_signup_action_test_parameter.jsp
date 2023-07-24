<%

    response.setHeader("Access-Control-Allow-Origin","*");

%>

<%@
    page language = "java"
    contentType = "text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%@ page import ="kurly.UserDAO" %>

<%
    request.setCharacterEncoding("UTF-8");
%>


<%

    //1.Request : 리액트에서 AJAX REST API로 전송된 프로퍼티를 파라미터를 변수에 넣어서
    //자바 DTO에 userBean을 통해서 저장하고
    //2.Response: 다시 DTO 에서 getUser_id() 게터함수(getter함수) 로 입력데이터를 다시 리액트에세 응답하는 절차

    String user_id =        request.getParameter("user_id");
    String user_pw =        request.getParameter("user_pw");
    String user_name =      request.getParameter("user_name");
    String user_email =     request.getParameter("user_email");
    String user_hp =        request.getParameter("user_hp");
    String user_address =   request.getParameter("user_address");
    String user_gender =    request.getParameter("user_gender");
    String user_birth =     request.getParameter("user_birth");
    String user_chooga =    request.getParameter("user_chooga");
    String user_service =   request.getParameter("user_service");
%>




{"아이디" :  " <%= user_id %>" , "비밀번호" :" <%= user_pw %>" , "이름" :    " <%= user_name %>" , "이메일" :  " <%= user_email %>" , "전화번호" :" <%= user_hp %>" , "주소" :    " <%= user_address %>" , "성별" :    " <%= user_gender %>" , "생년월일" :" <%= user_birth %>" , "추가" :    " <%= user_chooga %>" , "이용약관" :" <%= user_service %>" }

