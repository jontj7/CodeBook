package com.codebook.controller.auth;

import com.codebook.dto.LoginRequest;
import com.codebook.dto.LoginResponse;
import com.codebook.dto.RegisterRequest;
import com.codebook.model.Usuario;
import com.codebook.model.Rol;
import com.codebook.repository.UsuarioRepository;
import com.codebook.repository.RolRepository;
import com.codebook.config.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(request.getCorreo());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
                Set<String> roles = usuario.getRoles().stream()
                        .map(Rol::getNombre)
                        .collect(Collectors.toSet());

                // ✅ Generar token
                String token = jwtUtils.generateToken(usuario.getCorreo());

                // ✅ Devolver respuesta con token
                LoginResponse response = new LoginResponse(
                        token,
                        usuario.getId(),
                        usuario.getNombre(),
                        usuario.getCorreo(),
                        roles
                );

                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body("Credenciales inválidas ❌");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body("El correo ya está registrado ❌");
        }

        Rol rolUsuario = rolRepository.findByNombre("USUARIO")
                .orElseThrow(() -> new RuntimeException("Rol USUARIO no encontrado"));

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setCorreo(request.getCorreo());
        nuevoUsuario.setContrasena(passwordEncoder.encode(request.getContrasena()));
        nuevoUsuario.setRoles(Set.of(rolUsuario));

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok("Usuario registrado correctamente ✅");
    }

    @PutMapping("/usuarios/{id}/cambiar-rol")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cambiarRol(@PathVariable Integer id, @RequestParam String nuevoRol) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuario no encontrado ❌");
        }

        Rol rol = rolRepository.findByNombre(nuevoRol.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Usuario usuario = usuarioOpt.get();
        usuario.setRoles(Set.of(rol)); // Reemplaza todos los roles anteriores

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Rol cambiado correctamente a " + nuevoRol + " ✅");
    }

    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) {
        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body("El correo ya está registrado ❌");
        }

        Rol rolAdmin = rolRepository.findByNombre("ADMIN")
                .orElseThrow(() -> new RuntimeException("Rol ADMIN no encontrado"));

        Usuario nuevoAdmin = new Usuario();
        nuevoAdmin.setNombre(request.getNombre());
        nuevoAdmin.setCorreo(request.getCorreo());
        nuevoAdmin.setContrasena(passwordEncoder.encode(request.getContrasena()));
        nuevoAdmin.setRoles(Set.of(rolAdmin));

        usuarioRepository.save(nuevoAdmin);

        return ResponseEntity.ok("Administrador registrado correctamente ✅");
    }
}
