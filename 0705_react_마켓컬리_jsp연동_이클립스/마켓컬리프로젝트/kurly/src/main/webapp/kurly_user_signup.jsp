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
    <title>회원가입</title>
    <link rel="stylesheet" href="./public/css/style.css">
</head>
<body>
    <div id="wrap">
        <section id="signup">
            <div class="container">
                <div class="title">
                    <h1>회원가입</h1>
                    <p><span>*</span>필수입력사항</p>
                    <hr>
                </div>
                <div class="content">
                    <form action="./kurly_user_signup_action.jsp" id="kurly" name="" method="post">
                        <ul>
                            <li><input type="text" required autofocus name="user_id"     maxlength="16" id="userId" placeholder="아이디를 입력하세요"></li>
                            <li><input type="password" required autofocus  name="user_pw" maxlength="16"     id="userPw" placeholder="비밀번호를 입력하세요"></li>
                            <li><input type="text" required autofocus name="user_name"   maxlength="30" id="userName" placeholder="이름을 입력하세요"></li>
                            <li><input type="email" required autofocus name="user_email"  maxlength="250" id="userEmail" placeholder="이메일을 입력하세요"></li>
                            <li><input type="text" required autofocus name="user_hp"     maxlength="13" id="userHp" placeholder="전화번호를 입력하세요"></li>
                            <li><input type="text" required autofocus name="user_addr"   maxlength="250" id="userAddr" placeholder="주소를 입력하세요"></li>
                            <li>
                                <input type="radio" name="user_gender"  id="male" placeholder="성별를 입력하세요" value="남성">
                                <label for="male">남성</label>
                                <input type="radio" name="user_gender" id="female" placeholder="성별를 입력하세요" value="여성">
                                <label for="female">여성</label>
                                <input type="radio" name="user_gender" id="none" placeholder="성별를 입력하세요" value="선택안함">
                                <label for="none">선택안함</label>
                            </li>
                            <li><input type="text" name="user_birth" maxlength="10" id="userBirth" placeholder="생년월일을 입력하세요"></li>
    
                        </ul>
                        <div class="submit">
                            <button type="submit">가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </div>
    
</body>
</html>