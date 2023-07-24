package com.example.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.Clock;

@Controller
public class UserController {
    @Autowired
    private  UserEntityRepository userEntityRepository;
    @GetMapping("/write.do")
    public String writeMethod(){
        return "write";
    }
;
    @PostMapping("/view.do")
    public String viewMethod(UserDTO userDTO, Model model){
        System.out.println(userDTO.toString());
        model.addAttribute("UserName",userDTO.getUserName());
        model.addAttribute("userHp",userDTO.getUserHp());
        model.addAttribute("userEmail",userDTO.getUserEmail());
        model.addAttribute("userSubject",userDTO.getUserSubject());
        model.addAttribute("userContent",userDTO.getUserContent());

        UserDTOEntity userDTOEntity = userDTO.toEntity();
        //System.out.println(userDTOEntity.toString()); //1차 출력 내용

        UserDTOEntity saved = userEntityRepository.save(userDTOEntity);
        System.out.println(saved.toString()); //1차 출력 내용

        return "view";
    }



}
