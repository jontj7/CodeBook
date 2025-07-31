package com.codebook.repository;

import com.codebook.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {
    // Método añadido para buscar libros por el nombre de la categoría
    List<Libro> findByCategoria(String categoria);
    // Puedes añadir otros métodos si los necesitas, ej.
    // Optional<Libro> findByTitulo(String titulo);
    // List<Libro> findByAutor(String autor);
}