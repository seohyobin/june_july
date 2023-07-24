<%@
    page
    language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>
<%@ page import = "kurly.UserDAO" %>
<%@ page import = "kurly.UserDTO" %>
<%@ page import = "java.util.*" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 페이지</title>
    <link rel="stylesheet" href="./public/css/style.css">
</head>
<body>
    <div id="wrap">
        <section id="main" >
            <div class="container">
                <div class="title">
                    <h1>메인 페이지</h1>
                    <hr>
                </div>
                <%
                    //2. 회원가입 페이지에서 가입된 화면처리하기
                    //   로그인 유지 회원아이디 변수에 넣어준다.

                    String loginId = null;
                    if(session.getAttribute("user_id") != null ){ // 세션설정된 값 가져오기
                        loginId =(String) session.getAttribute("user_id");
                    }

                    if(loginId == null){
                %>
                        <div class="content">
                            <h3>접속하기</h3>
                            <ul>
                                <li><a href="./kurly_user_signin.jsp">로그인</a></li>
                                <li><a href="./kurly_user_signup.jsp">회원가입</a></li>
                            </ul>
                        </div>
                        
                <%
                    }
                    else{
                %>
                        <div class="content">
                            <h3>회원관리</h3>
                            <h4>ID : [<%= loginId %>] 님</h4>
                            <ul>
                                <li><a href="./kurly_user_update.jsp">개인정보수정</a></li>
                                <li><a href="./kurly_user_delete.jsp">회원탈퇴</a></li>
                                <li><a href="./kurly_user_logout.jsp">로그아웃</a></li>
                            </ul>
                        </div>
            </div>


            <div class="get-join-list"> 
                <table>
                    <caption><span>♡</span> 회원가입LIST <span>♡</span></caption>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>비밀번호</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>성별</th>
                        <th>생년월일</th>
                        <th>작성일</th>
                    </tr>


                        <%
                            UserDAO userDAO = new UserDAO();
                            List<UserDTO> list = new ArrayList<>();
                            list = userDAO.getJoinList();
                            if(list.size() == 0){
                        %>
                                <script>alert("조회불가");</script>
                        <%
                            }
                            else{
                                for(UserDTO item : list){
    
                         %>
               
                            <tr>
                                <td><%= item.getIdx() %></td>
                                <td><%= item.getUser_id() %></td>
                                <td><%= item.getUser_pw() %></td>
                                <td><%= item.getUser_name()%></td>
                                <td><%= item.getUser_email() %></td>
                                <td><%= item.getUser_hp() %></td>
                                <td><%= item.getUser_addr() %></td>
                                <td><%= item.getUser_gender() %></td>
                                <td><%= item.getUser_birth() %></td>
                                <td><%= item.getGaib_date() %></td>
                            </tr>
                 

                    <%
                            }
                        }
                    %>
                </table>
            </div>
            
    <%
        }
    %>
        </section>

    </div>
    
</body>
</html>