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
import com.interdiciplinar.fullstack.modelo.Transferencia;
import com.interdiciplinar.fullstack.repositorio.saldoRepositorio;
import com.interdiciplinar.fullstack.repositorio.transferenciaRepositorio;


@RestController

public class controlerTransferencia {
    
    @Autowired
    private transferenciaRepositorio transferenciaRepositorio;

    @Autowired
    private saldoRepositorio saldoRepositorio;

   
    @GetMapping("/transferencia/listar")
    public Iterable<Transferencia>listar(){
        return transferenciaRepositorio.findAll();
    }

     @PostMapping("/transferenciaTed/cadastrar")
    public ResponseEntity<String> cadastrarTed(@RequestParam Long codigoSaldo,@RequestBody Transferencia obj) {
        Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);


        if (saldo == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ");
        }
    
        saldo.setSaldo(saldo.getSaldo()-obj.getTransferencia()-11);   
        saldoRepositorio.save(saldo);
        transferenciaRepositorio.save(obj);
    
        return ResponseEntity.ok("Transferencia realizado com sucesso");
    }



@PostMapping("/transferenciaDoc/cadastrar")
    public ResponseEntity<String> cadastrarDoc(@RequestParam Long codigoSaldo,@RequestBody Transferencia obj) {
        Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);

     

        if (saldo == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ");
        }
    
        saldo.setSaldo(saldo.getSaldo()-obj.getTransferencia()-13);   
        saldoRepositorio.save(saldo);
        transferenciaRepositorio.save(obj);
    
        return ResponseEntity.ok("Transferencia realizado com sucesso");
    }

  @PostMapping("/transferenciaPix/cadastrar")
    public ResponseEntity<String> cadastrarPix(@RequestParam Long codigoSaldo,@RequestBody Transferencia obj) {
        Saldo saldo = saldoRepositorio.findById(codigoSaldo).orElse(null);

    
        if (saldo == null ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ");
        }
    
        saldo.setSaldo(saldo.getSaldo()-obj.getTransferencia());   
        saldoRepositorio.save(saldo);
        transferenciaRepositorio.save(obj);
    
        return ResponseEntity.ok("Transferencia realizado com sucesso");
    }

    @PostMapping("/confereTransferencia")
    public ResponseEntity<String> confereTransferencia(@RequestParam Long codigoSaldoDestino,
    @RequestParam Long codigoSaldoOrigem,
    @RequestParam String agencia,@RequestBody Transferencia obj
    ) {

        Saldo saldoRecebe = saldoRepositorio.findById(codigoSaldoDestino).orElse(null);
        Saldo saldoTransfere = saldoRepositorio.findById(codigoSaldoOrigem).orElse(null);
        
        if (saldoRecebe == null || saldoTransfere == null || !agencia.equals("001")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saldo não encontrado para o código ou agência inválida");
        }

        saldoTransfere.setSaldo(saldoTransfere.getSaldo()-obj.getTransferencia());   
        saldoRepositorio.save(saldoTransfere);

        saldoRecebe.setSaldo(saldoRecebe.getSaldo()+obj.getTransferencia());   
        saldoRepositorio.save(saldoRecebe);

        transferenciaRepositorio.save(obj);
        return ResponseEntity.ok("Conta e agência válidas.");
    }
 }
