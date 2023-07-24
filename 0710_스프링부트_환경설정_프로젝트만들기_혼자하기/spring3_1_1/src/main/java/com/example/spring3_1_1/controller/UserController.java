package com.example.spring3_1_1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping("/login.do")
    public String loginMethod(Model model){
    model.addAttribute("userName","효비니");
        return"login";
    }
    @GetMapping("/logout.do")
    public String logoutMethod(Model model){
        model.addAttribute("userName","효비니");
        return "logout";
    }


}
