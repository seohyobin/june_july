package com.example.spring2_7_13.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    //로그인 페이지 메소드!
    @GetMapping("/login.do")
    public String loginMethod(Model model){
        model.addAttribute("userName","서효빈");
        return "login";
    }
    @GetMapping("/logout.do")
    public  String logoutMethod(Model model){
        model.addAttribute("userName","서효빈");
        return "logout";
    }
}
