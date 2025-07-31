package com.codebook.service;

import com.codebook.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<Usuario> findAll();
    Optional<Usuario> findById(Integer id);
    Usuario save(Usuario usuario);
    void delete(Integer id);
    List<Usuario> findByNombre(String nombre);
}
