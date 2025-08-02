package com.codebook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Integer id;
    private String nombre;
    private String correo;
    private Set<String> roles;
}
