<?
    //1. DataBase 데이터베이스 접근권한   
    // moonjong.dothome.co.kr/signup_db/insert.php
    $db_server    = 'localhost';
    $db_user_name = 'moonjong';
    $db_password  = 'anstjswhd0105#';
    $db_name      = 'moonjong';

    $conn = mysqli_connect($db_server, $db_user_name, $db_password, $db_name);
    mysqli_set_charset($conn, 'utf8');

    // if( !$conn ){
    //     die('데이터베이스 접근실패!');
    // }
    // else {
    //     echo('데이터베이스 접근성공!');
    // }
    // 
    // 필드명(Field == item == attribute = column)
    // id, pw, irum, email, hp, addr, gender, birth, chooga, service, gaib_date

    // 데이터베이스에 회원정보 저장하기
    // $변수 = "INSERT INTO 테이블이름 (필드1, 필드2, 필드....) VALUES ('필드1값', '필드2값', '필드값'....)";
    
    $sql = "INSERT INTO signup_table(id, pw, irum, email, hp, addr, gender, birth, chooga, service, gaib_date)
            VALUES
            ('moonjong',  'moonjong123', '문선종', 'moonjong@maver.com', '010-7942-5305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16'),
            ('moonjong2', 'moonjong1233', '이순신', 'moonjong1@maver.com', '010-7943-2305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16'),
            ('moonjong3', 'moonjong1234', '김유신', 'moonjong2@maver.com', '010-722-1305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16'),
            ('moonjong4', 'moonjong1235', '류관순', 'moonjong3@maver.com', '010-242-3305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16'),
            ('moonjong5', 'moonjong1236', '김대중', 'moonjong4@maver.com', '010-342-4305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16'),
            ('moonjong6', 'moonjong1237', '이순심', 'moonjong5@maver.com', '010-942-5305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16'),
            ('moonjong7', 'moonjong1238', '김영광', 'moonjong6@maver.com', '010-348-6305', '경기도 고양시 일산서구 강선마을 주엽동 1408동 205호', '남자', '1970-09-10', '마켓컬리 일일세일', '이용약관 동의필수, 개인정보 수집∙이용 동의필수, 본인은 만 14세 이상입니다.본인은 만 14세 이상입니다.', '2023-03-16')";
    $result = mysqli_query($conn, $sql);  // 쿼리 실행

    if(!$result){
        echo("데이터베이스 테이블에 회원 정보 저장 실패!");
    }
    else {
        echo("데이터베이스 테이블에 회원 정보 저장 성공!");
    }


?>