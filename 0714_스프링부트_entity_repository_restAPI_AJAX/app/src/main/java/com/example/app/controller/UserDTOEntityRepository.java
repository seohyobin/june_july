package com.example.app.controller;

import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface UserDTOEntityRepository extends CrudRepository <UserDTOEntity,Long> {
    @Override
    ArrayList<UserDTOEntity> findAll();
}
