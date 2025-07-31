package com.codebook.service;

import com.codebook.model.Categorias;
import com.codebook.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriasRepository;

    public List<Categorias> getAllCategorias() {
        return categoriasRepository.findAll();
    }

    public Optional<Categorias> getCategoriaById(Long id) {
        return categoriasRepository.findById(id);
    }

    public Optional<Categorias> getCategoriaByNombre(String nombre) {
        return categoriasRepository.findByNombre(nombre);
    }

    public Categorias createCategoria(Categorias categorias) {
        return categoriasRepository.save(categorias);
    }

    public Categorias updateCategoria(Long id, Categorias categoriaDetails) {
        Categorias categorias = categoriasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + id));

        categorias.setNombre(categoriaDetails.getNombre());
        categorias.setDescripcion(categoriaDetails.getDescripcion());
        return categoriasRepository.save(categorias);
    }

    public void deleteCategoria(Long id) {
        categoriasRepository.deleteById(id);
    }
}