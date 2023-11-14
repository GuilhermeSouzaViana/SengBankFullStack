package com.interdiciplinar.fullstack.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Transferencia;

@Repository
public interface transferenciaRepositorio extends CrudRepository <Transferencia, Long>{
    
}
