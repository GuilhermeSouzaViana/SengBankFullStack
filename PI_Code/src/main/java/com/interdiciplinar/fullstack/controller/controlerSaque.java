package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.interdiciplinar.fullstack.modelo.Saldo;
import com.interdiciplinar.fullstack.modelo.Saque;
import com.interdiciplinar.fullstack.modelo.Usuario;
import com.interdiciplinar.fullstack.repositorio.saldoRepositorio;
import com.interdiciplinar.fullstack.repositorio.saqueRepositorio;
import com.interdiciplinar.fullstack.repositorio.usuarioRepositorio;

@RestController
public class controlerSaque {
    
@Autowired
private saqueRepositorio saqueRepositorio;

@Autowired 
private saldoRepositorio saldoRepositorio;

@Autowired
private usuarioRepositorio usuarioRepositorio;


@GetMapping("/saque/listar")
public Iterable<Saque>listar(){
return  saqueRepositorio.findAll();

}

@PostMapping("/saque/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestParam Long codigoSaldo,@RequestParam Long codigoConta,
    @RequestBody Saque obj) {
        Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);

       Usuario usuario=usuarioRepositorio.findById(codigoConta).orElse(null);

        if (saldo == null || usuario == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ");
        }
    
        saldo.setSaldo(saldo.getSaldo()-obj.getSaque());   
        saldoRepositorio.save(saldo);
        saqueRepositorio.save(obj);
    
        return ResponseEntity.ok("Saque realizado com sucesso");
    }
}
