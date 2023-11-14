package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.interdiciplinar.fullstack.modelo.Saldo;
import com.interdiciplinar.fullstack.repositorio.saldoRepositorio;

@RestController

public class controlerSaldo {

    @Autowired
    private saldoRepositorio saldoRepositorio;

    @GetMapping("/saldo/listar")
    public Iterable<Saldo> listar() {
        return saldoRepositorio.findAll();
    }


    @PostMapping("saldo/cadastrar")
        public Saldo cadastrar(@RequestBody Saldo obj){
             return saldoRepositorio.save(obj);
        }

}
