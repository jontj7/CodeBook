package com.codebook.controller.usuario;

import com.codebook.model.Usuario;
import com.codebook.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> getAll() {
        return usuarioService.findAll();
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public Usuario getById(@PathVariable Integer id) {
        return usuarioService.findById(id).orElse(null);
    }

    // Buscar usuarios por nombre (por ejemplo, query param)
    @GetMapping("/search")
    public List<Usuario> getByNombre(@RequestParam String nombre) {
        return usuarioService.findByNombre(nombre);
    }

    // Crear nuevo usuario
    @PostMapping
    public Usuario create(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    // Actualizar usuario por ID
    @PutMapping("/{id}")
    public Usuario update(@PathVariable Integer id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return usuarioService.save(usuario);
    }

    // Eliminar usuario por ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        usuarioService.delete(id);
    }
}
