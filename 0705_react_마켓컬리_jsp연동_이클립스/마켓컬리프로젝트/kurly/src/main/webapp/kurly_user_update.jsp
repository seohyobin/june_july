<%@
    page
    language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%@ page import = "kurly.UserDAO" %>
<%@ page import = "kurly.UserDTO" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원수정</title>
    <link rel="stylesheet" href="./public/css/style.css">
</head>
<body>
    <div id="wrap">

        <%
            String loginId = null;
            if(session.getAttribute("user_id") != null){
                loginId = (String)session.getAttribute("user_id");
            }
        %>

        <%

        UserDAO userDAO = new UserDAO();
        UserDTO userDTO = userDAO.getJoin(loginId);

        %>

        <section id="signup">
            <div class="container">
                <div class="title">
                    <h1>회원수정</h1>
                    <p><span>*</span>필수입력사항</p>
                    <hr>
                </div>
                <div class="content">
                    <form action="./kurly_user_update_action.jsp" id="kurly" name="" method="post">
                        <ul>
                            <li class="id"><%= loginId %> 님</li>
                            <li class="hide"><input type="text" required autofocus name="user_id"      maxlength="16" id="userId" placeholder="아이디를 입력하세요" value="<%= loginId %>" /></li>
                            <li><input type="password" required autofocus  name="user_pw" maxlength="16" id="userPw" placeholder="수정 비밀번호를 입력하세요" value="<%= userDTO.getUser_pw() %>" /></li>
                            <li><input type="text" required autofocus name="user_name"    maxlength="30" id="userName" placeholder="수정 이름을 입력하세요"  value="<%= userDTO.getUser_name() %>" /></li>
                            <li><input type="email" required autofocus name="user_email"  maxlength="250"id="userEmail" placeholder="수정 이메일을 입력하세요"  value="<%= userDTO.getUser_email() %>" /></li>
                            <li><input type="text" required autofocus name="user_hp"      maxlength="13" id="userHp" placeholder="수정 전화번호를 입력하세요"  value="<%= userDTO.getUser_hp() %>" /></li>
                            <li><input type="text" required autofocus name="user_addr"    maxlength="250"id="userAddr" placeholder="수정 주소를 입력하세요"  value="<%= userDTO.getUser_addr() %>" /></li>
                            <li>
                                <input type="radio" name="user_gender" id="male" placeholder="성별를 입력하세요" value="남성" <% if(userDTO.getUser_gender().equals("남성")){ %> checked="checked" <% } %> />
                                <label for="male">남성</label>
                                <input type="radio" name="user_gender" id="female" placeholder="성별를 입력하세요" value="여성" <% if(userDTO.getUser_gender().equals("여성")){ %> checked="checked" <% } %> />
                                <label for="female">여성</label>
                                <input type="radio" name="user_gender" id="none" placeholder="성별를 입력하세요" value="선택안함" <% if(userDTO.getUser_gender().equals("선택안함")){ %> checked="checked" <% } %> />
                                <label for="none">선택안함</label>
                            </li>
                            <li><input type="text" name="user_birth" maxlength="10" id="userBirth" placeholder="생년월일을 입력하세요"  value="<%= userDTO.getUser_birth() %>" /></li>
                        </ul>
                        <div class="submit">
                            <button type="submit">수정하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>  
</body>
</html>