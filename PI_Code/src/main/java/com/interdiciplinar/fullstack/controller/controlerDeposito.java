package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.interdiciplinar.fullstack.modelo.Deposito;
import com.interdiciplinar.fullstack.modelo.Saldo;
import com.interdiciplinar.fullstack.modelo.Usuario;
import com.interdiciplinar.fullstack.repositorio.depositoRepositorio;
import com.interdiciplinar.fullstack.repositorio.saldoRepositorio;
import com.interdiciplinar.fullstack.repositorio.usuarioRepositorio;

@RestController
public class controlerDeposito {
    
    @Autowired
    private depositoRepositorio depositoRepositorio;
    @Autowired
    private saldoRepositorio saldoRepositorio;
    @Autowired
    private usuarioRepositorio usuarioRepositorio;

    @GetMapping("/deposito/listar")
    public Iterable<Deposito>listar(){
        return depositoRepositorio.findAll();
    }

    @PostMapping("/deposito/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestParam Long codigoSaldo,@RequestParam Long codigoConta,
    @RequestParam String agenciaConta,@RequestBody Deposito obj) {
        Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);

       Usuario usuario=usuarioRepositorio.findById(codigoConta).orElse(null);

       String ag="001";
    
        if (saldo == null || usuario == null || !ag.equals(agenciaConta) ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ");
        }
    
        saldo.setSaldo(saldo.getSaldo()+obj.getDeposito());   
        saldoRepositorio.save(saldo);
        depositoRepositorio.save(obj);
    
        return ResponseEntity.ok("Depósito realizado com sucesso");
    }
   
}
