package com.example.app.controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@AllArgsConstructor//모든생성자
@NoArgsConstructor //기본생성자     //public  UserDTOEntity(){} private 절대안돼
public class UserDTOEntity {
    //폼데이터 속성들 가져온다.
    //가져온 폼 요소 속성들을 칸(열 컬럼 Column)을 할당한다.
    //식별자가 유일성
    @Id
    @GeneratedValue //자동증가번호 할당
    private Long id;
    @Column
    private  String userName;
    @Column
    private  String userHp;
    @Column
    private  String userEmail;
    @Column
    private  String userSubject;
    @Column
    private  String userContent;

    //기본생성자는 private 절 대  안 돼 !

    //public  UserDTOEntity(){}

}
