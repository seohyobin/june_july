package com.example.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.Clock;

@Controller
public class UserController {
    @GetMapping("/write.do")
    public String writeMethod(){
        return "write";
    }

    @PostMapping("/view.do")
    public String viewMethod(UserDTO userDTO, Model model){
        System.out.println(userDTO.toString());
        model.addAttribute("UserName",userDTO.getUserName());
        model.addAttribute("userHp",userDTO.getUserHp());
        model.addAttribute("userEmail",userDTO.getUserEmail());
        model.addAttribute("userSubject",userDTO.getUserSubject());
        model.addAttribute("userContent",userDTO.getUserContent());
        return "view";
    }

}
