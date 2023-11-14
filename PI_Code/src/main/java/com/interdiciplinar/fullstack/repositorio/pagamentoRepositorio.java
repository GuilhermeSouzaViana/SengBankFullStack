package com.interdiciplinar.fullstack.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.interdiciplinar.fullstack.modelo.Pagamento;

@Repository
public interface pagamentoRepositorio extends CrudRepository <Pagamento,Long>{
    
}
