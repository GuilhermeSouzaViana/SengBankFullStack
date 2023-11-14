package com.interdiciplinar.fullstack.repositorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Usuario;

@Repository
public interface usuarioRepositorio extends JpaRepository <Usuario,Long> {
    Usuario findByCpf(String cpf);
}
