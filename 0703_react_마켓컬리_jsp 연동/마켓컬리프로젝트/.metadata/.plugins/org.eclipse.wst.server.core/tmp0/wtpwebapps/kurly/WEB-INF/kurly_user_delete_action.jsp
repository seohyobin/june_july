<%@
    page language = "java"
    contentType = "text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%@ page import ="kurly.UserDAO" %>
<%
    request.setCharacterEncoding("UTF-8");
%>

<jsp:useBean id="userDTO" class="kurly.UserDTO" scope="page"/>
<jsp:setProperty name="userDTO" property="user_id"/>
<jsp:setProperty name="userDTO" property="user_pw"/>

<%
    if(userDTO.getUser_id()==null || userDTO.getUser_pw()==null ){
%>

<script>
    alert("빈항목이 있습니다 \n다시 시도해주세요!!!!!!");
    history.back();
</script>

<%
    }
    else{
        UserDAO userDAO = new UserDAO();
        int result  =  userDAO.delete(userDTO);
      
%>
    <% 
        if(result>=1){ 
        //session.invalidate();
    %>    
    
            <script>
                alert('탈퇴되었습니다.');
                window.location.href="./kurly_user_logout.jsp"
            </script>

<%          
    }
    else{
%>
               <script>
                   alert('아이디, 비밀번호를 확인하고\n다시 시도해주세요.');
                   history.back();
               </script>
<%
        }
        }

%> 



