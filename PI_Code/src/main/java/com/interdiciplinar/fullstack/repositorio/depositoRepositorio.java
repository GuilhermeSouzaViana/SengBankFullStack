package com.interdiciplinar.fullstack.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Deposito;

@Repository
public interface depositoRepositorio extends CrudRepository <Deposito, Long> {
    
}
