import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;

  email!: string;
  senha!: string;


  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.email = '';
    this.senha = '';

  }

  onSubmit(): void{

    if((this.email === 'sheldor@gmail.com') && (this.senha === 'cooper')){
      this.loginService.login();
    }else{
      window.alert("USUARIO NÃO AUTORIZADO! \n FALE COM FABIULA!");
      this.formLogin.reset();
    }

  }

}
