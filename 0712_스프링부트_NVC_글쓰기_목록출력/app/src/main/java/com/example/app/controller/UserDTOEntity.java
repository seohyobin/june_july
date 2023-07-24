package com.example.app.controller;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
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

    public UserDTOEntity(Long id, String userName, String userHp, String userEmail, String userSubject, String userContent) {
        this.id = id;
        this.userName = userName;
        this.userHp = userHp;
        this.userEmail = userEmail;
        this.userSubject = userSubject;
        this.userContent = userContent;
    }

    @Override
    public String toString() {
        return "UserDTOEntity{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", userHp='" + userHp + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userSubject='" + userSubject + '\'' +
                ", userContent='" + userContent + '\'' +
                '}';
    }
}
