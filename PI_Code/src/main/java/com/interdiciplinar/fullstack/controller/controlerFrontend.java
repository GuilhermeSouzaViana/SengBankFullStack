package com.interdiciplinar.fullstack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class controlerFrontend {
    
@GetMapping("")
public String login(){
    return "login";
}

@GetMapping("/cadastro")
public String cadastro(){
    return "cadastro";
}


@GetMapping("/menu")
public String menu(){
    return "menu";
}

@GetMapping("/perfil")
public String perfil(){
    return "perfilMenu";
}


@GetMapping("/perfil/exibir")
public String perfilExibir(){
    return "perfilExibir";
}


@GetMapping("/perfil/alterar")
public String perfilAlterar(){
    return "perfilAlterar";
}

@GetMapping("/perfil/senha")
public String perfilSenha(){
    return "perfilAltsenha";
}

@GetMapping("/perfil/endereco")
public String perfilEndereco(){
    return "perfilAltendereco";
}

@GetMapping("/perfil/email")
public String perfilEmail(){
    return "perfilAltemail";
}

@GetMapping("/perfil/telefone")
public String perfilTelefone(){
    return "perfilAlttelefone";
}

@GetMapping("/perfil/salario")
public String perfilSalario(){
    return "perfilAltsalario";
}

@GetMapping("/saldo")
public String saldo(){
    return "saldo";
}

@GetMapping("/deposito")
public String deposito(){
    return "deposito";
}

@GetMapping("/saque")
public String saque(){
    return "saque";
}

@GetMapping("/transferencia")
public String transferencia(){
    return "transferencia";
}


@GetMapping("/transferenciaTed")
public String transferenciaTed(){
    return "transferenciaTed";
}


@GetMapping("/transferenciaDoc")
public String transferenciaDoc(){
    return "transferenciaDoc";
}

@GetMapping("/transferenciaPix")
public String transferenciaPix(){
    return "transferenciaPix";
}


@GetMapping("/pagamentos")
public String pagamentos(){
    return "pagamentos";
}

@GetMapping("/pagamentos/boleto")
public String pagamentosBoleto(){
    return "pagamentoBoleto";
}

@GetMapping("/emprestimo")
public String emprestimo(){
    return "emprestimo";
}

@GetMapping("/extrato")
public String extrato(){
    return "extrato";
}

@GetMapping("/suporte")
public String suporte(){
    return "suporte";
}


@GetMapping("/comprovanteSaque")
public String comprovanteSaque(){
    return "comprovanteSaque";
}

@GetMapping("/comprovanteDeposito")
public String comprovanteDeposito(){
    return "comprovanteDeposito";
}

@GetMapping("/comprovanteTransferencia")
public String comprovanteTransferencia(){
    return "comprovanteTransferencia";
}


@GetMapping("/comprovantePagamento")
public String comprovantePagamento(){
    return "comprovantePagamento";
}

@GetMapping("/comprovanteEmprestimo")
public String comprovanteEmprestimo(){
    return "comprovanteEmprestimo";
}

}
