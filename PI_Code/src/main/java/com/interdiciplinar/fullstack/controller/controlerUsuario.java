package com.interdiciplinar.fullstack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.interdiciplinar.fullstack.modelo.Usuario;
import com.interdiciplinar.fullstack.repositorio.usuarioRepositorio;

@RestController
public class controlerUsuario {

   @Autowired
    private usuarioRepositorio usuarioRepositorio;
    
@GetMapping("/usuario/listar")
public Iterable<Usuario>listar(){
    return usuarioRepositorio.findAll();
}

@PostMapping("/usuario/cadastrar")
public Usuario cadastrar(@RequestBody Usuario obj){
  return usuarioRepositorio.save(obj);
}



@PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String cpf, @RequestBody Usuario obj) {
         Usuario usuario=usuarioRepositorio.findByCpf(cpf);

        if (usuario.getCpf().equals(obj.getCpf()) && usuario.getSenha().equals(obj.getSenha())) {
         
            return ResponseEntity.ok("Login bem-sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

@PostMapping("/confereCpf")
    public ResponseEntity<String> conferirCpf(@RequestParam String cpf, @RequestBody Usuario obj) {
         Usuario usuario=usuarioRepositorio.findByCpf(cpf);

        if(usuario==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cpf não encontrado para o código ");
        }else if (usuario.getCpf().equals(obj.getCpf())) { 
            return ResponseEntity.ok("Cpf ja cadastrado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Ok");
        }
    }

@PostMapping("/confereSenha")
    public ResponseEntity<String> conferirSenha(@RequestParam Long id, @RequestBody Usuario obj) {
         Usuario usuario=usuarioRepositorio.findById(id).orElse(obj);

        if (usuario.getSenha().equals(obj.getSenha())) { 
            return ResponseEntity.ok("Senha correta");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Ok");
        }
    }


@PutMapping("usuario/senha/{codigo}")
public ResponseEntity<String> alterarSenha(@PathVariable Long codigo, @RequestBody Usuario obj) {
    Usuario usuario = usuarioRepositorio.findById(codigo).orElse(null);

        usuario.setSenha(obj.getSenha());
        usuarioRepositorio.save(usuario);
        return ResponseEntity.ok("Senha alterada com sucesso");

}

@PutMapping("usuario/endereco/{codigo}")
public ResponseEntity<String> alterarEndereco(@PathVariable Long codigo, @RequestBody Usuario obj) {
    Usuario usuario = usuarioRepositorio.findById(codigo).orElse(null);

        usuario.setEndereco(obj.getEndereco());
        usuarioRepositorio.save(usuario);
        return ResponseEntity.ok("Endereço alterado com sucesso");
    
}

@PutMapping("usuario/salario/{codigo}")
public ResponseEntity<String> alterarSalario(@PathVariable Long codigo, @RequestBody Usuario obj) {
    Usuario usuario = usuarioRepositorio.findById(codigo).orElse(null);

        usuario.setSalarioBase(obj.getSalarioBase());
        usuarioRepositorio.save(usuario);
        return ResponseEntity.ok("Salario base alterado com sucesso");
    
}

@PutMapping("usuario/email/{codigo}")
public ResponseEntity<String> alterarEmail(@PathVariable Long codigo, @RequestBody Usuario obj) {
    Usuario usuario = usuarioRepositorio.findById(codigo).orElse(null);

        usuario.setEmail(obj.getEmail());
        usuarioRepositorio.save(usuario);
        return ResponseEntity.ok("Email alterado com sucesso");
    
}


@PutMapping("usuario/telefone/{codigo}")
public ResponseEntity<String> alterarTelefone(@PathVariable Long codigo, @RequestBody Usuario obj) {
    Usuario usuario = usuarioRepositorio.findById(codigo).orElse(null);

        usuario.setTelefone(obj.getTelefone());
        usuarioRepositorio.save(usuario);
        return ResponseEntity.ok("Telefone alterado com sucesso");
    
}


}
