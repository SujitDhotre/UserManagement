package com.example.userManagement.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "designation")
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;
}
