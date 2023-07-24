package com.example.app.controller;

import org.springframework.data.repository.CrudRepository;

public interface UserEntityRepository extends CrudRepository <UserDTOEntity,Long> {
}
