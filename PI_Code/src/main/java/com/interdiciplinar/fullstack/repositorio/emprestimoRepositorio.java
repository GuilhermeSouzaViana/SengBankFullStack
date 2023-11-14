package com.interdiciplinar.fullstack.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Emprestimo;

@Repository
public interface emprestimoRepositorio extends CrudRepository <Emprestimo, Long> {
    
}
