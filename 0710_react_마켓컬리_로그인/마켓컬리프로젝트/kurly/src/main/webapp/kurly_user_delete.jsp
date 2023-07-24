<%@
    page
    language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원삭제</title>
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

        <section id="signup">
            <div class="container">
                <div class="title">
                    <h1>회원탈퇴</h1>
                    <p><span>*</span>필수입력사항</p>
                    <hr>
                </div>
                <div class="content">
                    <form action="./kurly_user_delete_action.jsp" id="kurly" name="" method="post">
                        <ul>
                            <li><input type="text" required autofocus name="user_id"     maxlength="16" id="userId" placeholder="삭제 아이디를 입력하세요" value= "<%= loginId %>"></li>
                            <li><input type="password" required autofocus  name="user_pw" maxlength="16"     id="userPw" placeholder="삭제 비밀번호를 입력하세요"></li>
                        </ul>
                        <div class="submit">
                            <button type="submit">삭제하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </div>
    
</body>
</html>