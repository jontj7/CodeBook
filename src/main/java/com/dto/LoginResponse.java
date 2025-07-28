package com.codebook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import com.codebook.dto.LoginResponse;


import java.util.Set;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Integer id;
    private String nombre;
    private String correo;
    private Set<String> roles;
}
