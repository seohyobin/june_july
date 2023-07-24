package com.example.app.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.Clock;
import java.util.ArrayList;

@Controller
@Slf4j //로깅사용 어노테이션
public class UserController {
    //리파지토리 필드 생성자
    //자동으로 실행 의존성 주입
    @Autowired
    private  UserDTOEntityRepository userDTOEntityRepository;

    @GetMapping("/write.do")
    public String writeMethod(){
        return "write";
    }

    @PostMapping("/view.do")
    public String viewMethod(UserDTO userDTO, Model model){
        System.out.println(userDTO.toString());
        log.info(userDTO.toString());
        model.addAttribute("userName",userDTO.getUserName());
        model.addAttribute("userHp",userDTO.getUserHp());
        model.addAttribute("userEmail",userDTO.getUserEmail());
        model.addAttribute("userSubject",userDTO.getUserSubject());
        model.addAttribute("userContent",userDTO.getUserContent());
        //JPA
        //데이터베이스에 저장가능한 형태의 데이터 엔티티를 생성한다.
        //생성된 엔티티는 리파짓토리에 의해서 데이터베이스에 저장된다.
        //1. 폼데이터를 엔티티로 변환한다. => 엔티티 (entity)

        //id값 null -> entity!!
        UserDTOEntity userDTOEntity = userDTO.toEntity();
        //System.out.println(userDTOEntity.toString()); //1차 출력 내용

        //id=1 데이터베이스 저장 할당 번호증가!!
        UserDTOEntity saved = userDTOEntityRepository.save(userDTOEntity);
        System.out.println(saved.toString()); //1차 출력 내용

        return "view";
    }
    //LIST 목록  ArrayList 출력
    //폼데이터 DTO => 엔티티 =>리파지토리
    //저장된 db목록=>뷰템플릿 (머쉬태시 타임리프 ) ArrayList list 사용
    //dlsxlxl=>뷰템플릿 (머쉬태시 타임리프 ) ArrayList list 사용
    //userDTOEntityRepository 에서 모든 목록 가져오기

    @GetMapping("/list.do")
    public String list(Model model){
        //userDTOEntityRepository 에서 모든 목록 가져오기
        ArrayList<UserDTOEntity> userDTOEntityList= userDTOEntityRepository.findAll();
        model.addAttribute("userList",userDTOEntityList);
        return "list";

    }

}
