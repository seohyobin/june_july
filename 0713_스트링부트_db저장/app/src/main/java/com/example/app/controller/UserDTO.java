package com.example.app.controller;

public class UserDTO {
    private  String userName;
    private  String userHp;
    private  String userEmail;
    private  String userSubject;
    private  String userContent;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserHp() {
        return userHp;
    }

    public void setUserHp(String userHp) {
        this.userHp = userHp;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserSubject() {
        return userSubject;
    }

    public void setUserSubject(String userSubject) {
        this.userSubject = userSubject;
    }

    public String getUserContent() {
        return userContent;
    }

    public void setUserContent(String userContent) {
        this.userContent = userContent;
    }


    public UserDTO(String userName, String userHp, String userEmail, String userSubject, String userContent) {
        this.userName = userName;
        this.userHp = userHp;
        this.userEmail = userEmail;
        this.userSubject = userSubject;
        this.userContent = userContent;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userName='" + userName + '\'' +
                ", userHp='" + userHp + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userSubject='" + userSubject + '\'' +
                ", userContent='" + userContent + '\'' +
                '}';
    }

    public UserDTOEntity toEntity() {
        return new UserDTOEntity(null, userName, userHp, userEmail, userSubject, userContent);
    }
}
