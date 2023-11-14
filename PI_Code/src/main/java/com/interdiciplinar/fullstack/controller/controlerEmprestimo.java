package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.interdiciplinar.fullstack.modelo.Emprestimo;
import com.interdiciplinar.fullstack.modelo.Saldo;
import com.interdiciplinar.fullstack.modelo.Usuario;
import com.interdiciplinar.fullstack.repositorio.emprestimoRepositorio;
import com.interdiciplinar.fullstack.repositorio.saldoRepositorio;
import com.interdiciplinar.fullstack.repositorio.usuarioRepositorio;

@RestController
public class controlerEmprestimo {
 @Autowired
 private emprestimoRepositorio emprestimoRepositorio;
 @Autowired
 private saldoRepositorio saldoRepositorio;   
@Autowired
private usuarioRepositorio usuarioRepositorio;

 @GetMapping("/emprestimo/listar")
 public Iterable<Emprestimo>listar(){
    return emprestimoRepositorio.findAll();
 }

 @PostMapping("/emprestimo/cadastrar")
 public ResponseEntity<String> cadastrar(@RequestParam Long codigoSaldo,@RequestParam Long codigoConta,
 @RequestBody Emprestimo obj) {
     Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);

    Usuario usuario=usuarioRepositorio.findById(codigoConta).orElse(null);

     if (saldo == null || usuario == null ) {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conta não encontrado para o código ");
     }
 
     saldo.setSaldo(saldo.getSaldo()+obj.getEmprestimo());   
     saldoRepositorio.save(saldo);
     emprestimoRepositorio.save(obj);
 
     return ResponseEntity.ok("Emprestimo realizado com sucesso");
 }
}



