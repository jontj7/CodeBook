package com.codebook.controller.CategoriaController;

import com.codebook.model.Categorias;
import com.codebook.service.CategoriaService;
import com.codebook.dto.CategoriaRequest;
import com.codebook.dto.CategoriaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriasController {

    @Autowired
    private CategoriaService categoriasService;

    private CategoriaResponse convertToDto(Categorias categoria) {
        return new CategoriaResponse(categoria.getId(), categoria.getNombre(), categoria.getDescripcion());
    }

    private Categorias convertToEntity(CategoriaRequest dto) {
        return new Categorias(dto.getNombre(), dto.getDescripcion());
    }

    // Cualquier usuario puede ver todas las categorías.
    @GetMapping
    public List<CategoriaResponse> getAllCategorias() {
        return categoriasService.getAllCategorias().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Cualquier usuario puede ver una categoría por ID.
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaResponse> getCategoriaById(@PathVariable Long id) {
        return categoriasService.getCategoriaById(id)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Solo los usuarios con el rol 'ADMIN' pueden crear categorías.

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // O @Secured("ROLE_ADMIN")
    public ResponseEntity<CategoriaResponse> createCategoria(@Valid @RequestBody CategoriaRequest categoriaDTO) {
        Optional<Categorias> existingCategoria = categoriasService.getCategoriaByNombre(categoriaDTO.getNombre());
        if (existingCategoria.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Categorias categoriaToSave = convertToEntity(categoriaDTO);
        Categorias newCategoria = categoriasService.createCategoria(categoriaToSave);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(newCategoria));
    }

    // Solo los usuarios con el rol 'ADMIN' pueden actualizar categorías.
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // O @Secured("ROLE_ADMIN")
    public ResponseEntity<CategoriaResponse> updateCategoria(@PathVariable Long id, @Valid @RequestBody CategoriaRequest categoriaDTO) {
        try {
            Categorias existingCategoria = categoriasService.getCategoriaById(id)
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + id));

            if (!existingCategoria.getNombre().equals(categoriaDTO.getNombre())) {
                Optional<Categorias> categoriaWithNewName = categoriasService.getCategoriaByNombre(categoriaDTO.getNombre());
                if (categoriaWithNewName.isPresent() && !categoriaWithNewName.get().getId().equals(id)) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
            }

            existingCategoria.setNombre(categoriaDTO.getNombre());
            existingCategoria.setDescripcion(categoriaDTO.getDescripcion());

            Categorias updatedCategoria = categoriasService.updateCategoria(id, existingCategoria);
            return ResponseEntity.ok(convertToDto(updatedCategoria));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Solo los usuarios con el rol 'ADMIN' pueden eliminar categorías.
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // O @Secured("ROLE_ADMIN")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        categoriasService.deleteCategoria(id);
        return ResponseEntity.noContent().build();
    }
}