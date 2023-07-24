package com.example.app.controller;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class UserDTOEntity {
    @Id
    @GeneratedValue
    private  Long id;
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
