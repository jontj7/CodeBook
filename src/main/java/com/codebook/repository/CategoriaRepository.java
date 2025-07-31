package com.codebook.repository;

import com.codebook.model.Categorias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categorias, Long> {
    Optional<Categorias> findByNombre(String nombre);
}