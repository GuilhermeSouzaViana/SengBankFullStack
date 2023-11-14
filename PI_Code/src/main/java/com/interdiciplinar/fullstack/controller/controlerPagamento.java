package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.interdiciplinar.fullstack.modelo.Pagamento;
import com.interdiciplinar.fullstack.modelo.Saldo;

import com.interdiciplinar.fullstack.repositorio.pagamentoRepositorio;
import com.interdiciplinar.fullstack.repositorio.saldoRepositorio;

@RestController
public class controlerPagamento {
    @Autowired
    private pagamentoRepositorio pagamentoRepositorio;
    @Autowired
    private saldoRepositorio saldoRepositorio;

    @GetMapping("/pagamento/listar")
    public Iterable<Pagamento>listar(){
       return pagamentoRepositorio.findAll();
    }

    @PostMapping("/pagamentoBoleto/cadastrar")
    public ResponseEntity<String> cadastrarBoleto(@RequestParam Long codigoSaldo,@RequestBody Pagamento obj) {
        Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);
  
        if (saldo == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ");
        }
    
        saldo.setSaldo(saldo.getSaldo()-obj.getPagamento());   
        saldoRepositorio.save(saldo);
        pagamentoRepositorio.save(obj);
    
        return ResponseEntity.ok("Pagamento realizado com sucesso");
    }
}
