package com.codebook.service;

import com.codebook.model.Libro;
import com.codebook.model.Categorias; // Importa tu entidad Categorias
import com.codebook.repository.LibroRepository;
import com.codebook.repository.CategoriaRepository; // Importa tu nuevo repositorio de Categorias
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private CategoriaRepository categoriasRepository; // Inyecta el repositorio de categorías

    public List<Libro> findAll() {
        return libroRepository.findAll();
    }

    public Optional<Libro> findById(Long id) {
        return libroRepository.findById(id);
    }

    public Libro save(Libro libro) {
        // --- Lógica de Validación de Categoría (NUEVO) ---
        if (libro.getCategoria() != null && !libro.getCategoria().isEmpty()) {
            // Busca la categoría por nombre en tu base de datos de categorías
            Optional<Categorias> existingCategory = categoriasRepository.findByNombre(libro.getCategoria());
            if (existingCategory.isEmpty()) {
                throw new RuntimeException("La categoría '" + libro.getCategoria() + "' no existe en la base de datos.");
            }
        }
        return libroRepository.save(libro);
    }

    public void delete(Long id) {
        libroRepository.deleteById(id);
    }

    // Método para filtrar libros por categoría
    public List<Libro> findByCategoria(String categoria) {
        return libroRepository.findByCategoria(categoria);
    }
}