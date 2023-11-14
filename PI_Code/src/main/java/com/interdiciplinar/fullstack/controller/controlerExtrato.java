package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.interdiciplinar.fullstack.modelo.Extrato;
import com.interdiciplinar.fullstack.repositorio.extratoRepositorio;

@RestController
public class controlerExtrato {
    
@Autowired
private extratoRepositorio extratoRepositorio;

@GetMapping("/extrato/listar")
public Iterable<Extrato>listar(){
    return extratoRepositorio.findAll();
}

@PostMapping("extrato/cadastrar")
    public Extrato cadastrar(@RequestBody Extrato obj){
        return extratoRepositorio.save(obj);
    }
}


