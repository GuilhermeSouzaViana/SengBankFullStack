package com.interdiciplinar.fullstack.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Extrato;

@Repository
public interface extratoRepositorio extends CrudRepository <Extrato, Long> {
    
}
