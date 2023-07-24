<?

    // 관리자 서버
    // http://moonjong.dothome.co.kr/myadmin/
    // http://moonjong.dothome.co.kr/signup_db/form_data_insert.php
    // http://moonjong.dothome.co.kr/signup_db/form_data_insert.php

    // CORS
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Headers: *'); 

    // DB 인증
    $db_server    = 'localhost';
    $db_user_name = 'moonjong';
    $db_password  = 'anstjswhd0105#';
    $db_name      = 'moonjong';

    $conn = mysqli_connect($db_server, $db_user_name, $db_password, $db_name);
    mysqli_set_charset($conn, 'utf8');




    // 리액트 폼데이터 받는다.
    // 변수에 저장
    $user_id        = 'user_id';
    $user_pw        = 'user_pw';
    $user_name      = 'user_name';
    $user_email     = 'user_email';
    $user_hp        = 'user_hp';
    $user_addr      = 'user_addr';
    $user_gender    = '여성';
    $user_birth     = '1999-09-09';
    $user_add_input = 'user_add_input';
    $user_service   = 'user_service';
    $user_gaib_date = '2023-03-30';

    // $user_id        = $_POST['user_id'];
    // $user_pw        = $_POST['user_pw'];
    // $user_name      = $_POST['user_name'];
    // $user_email     = $_POST['user_email'];
    // $user_hp        = $_POST['user_hp'];
    // $user_addr      = $_POST['user_addr'];
    // $user_gender    = $_POST['user_gender'];
    // $user_birth     = $_POST['user_birth'];
    // $user_add_input = $_POST['user_add_input'];
    // $user_service   = $_POST['user_service'];
    // $user_gaib_date = $_POST['user_gaib_date'];


    // DB에 저장
    $sql = "INSERT INTO signup_table(id, pw, irum, email, hp, addr, gender, birth, chooga, service, gaib_date) 
            VALUES('$user_id','$user_pw','$user_name','$user_email','$user_hp','$user_addr','$user_gender','$user_birth','$user_add_input','$user_service','$user_gaib_date')";
    $result = mysqli_query($conn, $sql);  // 쿼리 실행

    if(!$result){
        echo("데이터베이스 테이블에 회원 정보 저장 실패!");
    }
    else {
        echo("데이터베이스 테이블에 회원 정보 저장 성공!");
    }


?>