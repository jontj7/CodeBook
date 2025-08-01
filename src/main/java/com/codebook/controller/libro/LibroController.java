package com.codebook.controller.libro;

import com.codebook.model.Libro;
import com.codebook.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Libro> getAll(@RequestParam(required = false) String categoria) {
        if (categoria != null && !categoria.isEmpty()) {
            return libroService.findByCategoria(categoria);
        }
        return libroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> getById(@PathVariable Long id) {
        return libroService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Libro> create(@RequestBody Libro libro) {
        try {
            Libro savedLibro = libroService.save(libro);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedLibro);
        } catch (RuntimeException e) {
            // Manejar la excepción si la categoría no existe
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> update(@PathVariable Long id, @RequestBody Libro libro) {

        libro.setId(id);
        try {
            Libro updatedLibro = libroService.save(libro);
            return ResponseEntity.ok(updatedLibro);
        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        libroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}