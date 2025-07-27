package com.codebook.controller;

import com.codebook.model.Usuario;
import com.codebook.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios() {
        return usuarioRepo.findAll();
    }
}
