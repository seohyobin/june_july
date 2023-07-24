-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-03-16 16:26
-- 서버 버전: 8.0.32
-- PHP 버전: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `luck1409`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `sign_up`
--

CREATE TABLE `sign_up` (
  `idx` int NOT NULL COMMENT '자동증가번호',
  `id` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '아이디',
  `pw` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '비밀번호',
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이름',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '이메일',
  `hp` varchar(13) COLLATE utf8mb4_general_ci NOT NULL COMMENT '휴대폰',
  `address` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '주소',
  `gender` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '성별',
  `birth` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '생년월일',
  `service` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이용약관동의',
  `chooga` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '추가입력사항',
  `sign_up_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '가입일자'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='마켓컬리_회원가입_form';

CREATE TABLE `signup_table` (
  `idx` int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '자동증가번호',
  `user_id` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '아이디',
  `user_pw` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '비밀번호',
  `user_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이름',
  `user_email` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '이메일',
  `user_hp` varchar(13) COLLATE utf8mb4_general_ci NOT NULL COMMENT '휴대폰',
  `user_address` varchar(500) COLLATE utf8mb4_general_ci NOT NULL COMMENT '주소',
  `user_gender` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '성별',
  `user_birth` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '생년월일',
  `user_chooga` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '추가입력사항',
  `user_service` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이용약관동의',
  `user_sign_up_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '가입일자'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='마켓컬리_회원가입_form';
  //더미데이터 입력하기
  INSERT INTO signup_table( user_id, user_pw, user_name, user_email, user_hp, user_address, user_gender, user_birth, user_chooga, user_service) VALUES('hyo','hyo','효빈','hyo@nqver.com','01032468888','서울시마포구','여성','19930530','동의','서비스 이용약관 동의');
--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT COMMENT '자동증가번호';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
