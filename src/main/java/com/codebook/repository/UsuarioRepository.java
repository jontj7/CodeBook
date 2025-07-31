package com.codebook.repository;

import com.codebook.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreo(String correo);  // Para buscar por correo (registro/login)

    List<Usuario> findByNombreContainingIgnoreCase(String nombre);  // Para buscar por nombre (búsqueda parcial sin importar mayúsculas/minúsculas)
}
