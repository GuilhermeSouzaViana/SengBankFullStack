package com.interdiciplinar.fullstack.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Saque;

@Repository
public interface saqueRepositorio extends CrudRepository <Saque, Long> {
    
}
