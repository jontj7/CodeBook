package com.codebook.config;

import com.codebook.model.Rol;
import com.codebook.repository.RolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initRoles(RolRepository rolRepository) {
        return args -> {
            if (rolRepository.findByNombre("ADMIN").isEmpty()) {
                Rol rolAdmin = new Rol();
                rolAdmin.setNombre("ADMIN");
                rolRepository.save(rolAdmin);
            }

            if (rolRepository.findByNombre("USUARIO").isEmpty()) {
                Rol rolUsuario = new Rol();
                rolUsuario.setNombre("USUARIO");
                rolRepository.save(rolUsuario);
            }
        };
    }

}
