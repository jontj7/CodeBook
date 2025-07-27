package com.codebook.controller;

import com.codebook.model.Libro;
import com.codebook.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Libro> getAll() {
        return libroService.findAll();
    }

    @GetMapping("/{id}")
    public Libro getById(@PathVariable Long id) {
        return libroService.findById(id).orElse(null);
    }

    @PostMapping
    public Libro create(@RequestBody Libro libro) {
        return libroService.save(libro);
    }

    @PutMapping("/{id}")
    public Libro update(@PathVariable Long id, @RequestBody Libro libro) {
        libro.setId(id);
        return libroService.save(libro);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        libroService.delete(id);
    }
}
