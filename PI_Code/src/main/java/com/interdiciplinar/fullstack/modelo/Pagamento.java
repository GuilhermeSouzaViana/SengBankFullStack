package com.interdiciplinar.fullstack.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Pagamento {
   
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long codigo;
private String tipoOperacao;
private String codigoDeBarras;
private String conta;
private double pagamento;
}
