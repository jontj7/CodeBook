package com.codebook.controller;

import com.codebook.dto.LoginRequest;
import com.codebook.model.Usuario;
import com.codebook.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository
                .findAll()
                .stream()
                .filter(u -> u.getCorreo().equals(request.getCorreo()))
                .findFirst();

        if (usuarioOpt.isPresent() &&
                usuarioOpt.get().getContrasena().equals(request.getContrasena())) {
            return ResponseEntity.ok("Login exitoso ✅");
        }

        return ResponseEntity.status(401).body("Credenciales inválidas ❌");
    }
}
