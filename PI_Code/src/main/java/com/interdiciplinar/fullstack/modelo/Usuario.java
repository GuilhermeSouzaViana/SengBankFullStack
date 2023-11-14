package com.interdiciplinar.fullstack.modelo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Usuario {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long codigo;
private String agencia;
private String nome;
@Column(unique = true)
private String cpf;
private String nascimento;
private String endereco;
private String senha;
private String email;
private String telefone;
private double salarioBase;

@OneToOne
@JoinColumn(name="codigo_saldo", referencedColumnName = "codigo")
private Saldo saldo;
}
