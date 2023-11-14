package com.interdiciplinar.fullstack.repositorio;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.interdiciplinar.fullstack.modelo.Saldo;

@Repository
public interface saldoRepositorio extends CrudRepository <Saldo, Long> {   
}
