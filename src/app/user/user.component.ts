import { UserService } from './../service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';
//import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  //variavel que preenche os campos do formulario e recebe os dados do formulario
  user!: User;

  /*
   * array que recebe tanto do localStorage quanto do json-server
   * ele recebe a lista do metodo getAll()
   */
  users: User[];

  /*
   * array que recebe dentro do metodo onDelete
   * um localStorage com filtro para fazer o delete do registro no localStorage
   */
  usersModify?: User[];

  //variavel no formulario que testa se a senha e a repetiçao da senha são iguais
  userRepassword: string = '';

  //variavel q verifica se o metodo é update ou não
  update: boolean = false;

  //variavel guarda o nome do usuario em caso do update do nome
  nomeUsuario!: string;

  /* construtor para usar com localstorage
  constructor() {
    //instancia o array
    this.users = [];
    //traz a lista para o array users
    this.getAll();
  }
  */
  constructor(private userService: UserService) {
    //instancia o array
    this.users = [];
    //traz a lista para o array users
    this.getAll();
  }

  ngOnInit(): void {
    //instancia o user com vazio
    this.user = new User('', '', '', '');
  }

  /*
   * metodo q faz o submit do formulario
   * ele verifica se o json esta trazendo dados, ai faz o submit no json-server
   * senão faz o submit no metodo onAddStorage que insere os dados no local
   */
  onSubmit(): void {
    /*
    //verifica se é update
    if (this.update) {
      this.users = this.users.filter((u) => {
        return u.username?.valueOf() != this.nomeUsuario?.valueOf();
      });

      this.users.push(this.user);
      localStorage.setItem('user', JSON.stringify(this.users));
      window.alert('Alteração realizada com sucesso!');
      this.update = false;
      this.nomeUsuario = '';
    } else {
      this.users.push(this.user);
      localStorage.setItem('user', JSON.stringify(this.users));
      window.alert('Cadastro realizado com sucesso!');
    }
    this.form.resetForm();
    this.user = new User('', '', '', '');
    this.userRepassword = '';

    this.users = JSON.parse(localStorage.getItem('user')!);
    */

    if(this.update){
      this.userService.updateUser(this.user);
      this.user = new User('', '', '', '');
      this.form.reset();
      this.update = false;
    }else{
      this.userService.addUser(this.user);
      this.user = new User('', '', '', '');
      this.form.reset();
    }
    this.userService.getAll().subscribe((users) => this.users = users);
  }

  onUpdate(user: User) {
    let usuario = User.clone(user);
    usuario.id = user.id;
    this.user = usuario;
    this.update = true;
    this.nomeUsuario = usuario.username;
  }

  onDelete(user: User): void {
    /*
    let confirmacao = window.confirm(
      'Remalmente deseja remover este usuario : ' + user.username
    );
    if (!confirmacao) {
      return;
    } else {
      this.usersModify = this.users.filter((u) => {
        return u.username?.valueOf() != user.username?.valueOf();
      });

      localStorage.setItem('user', JSON.stringify(this.usersModify));
      this.users = JSON.parse(localStorage.getItem('user')!);
    }
    */
    let confirmacao = window.confirm(
      'Remalmente deseja remover este livro : ' + user.username
    );

    if (!confirmacao) {
      return;
    } else {
      this.userService.deleteUser(user.id);
      this.user = new User('', '', '', '');
    }
    this.userService.getAll().subscribe((users) => this.users = users);
  }

  getAll(): void {
    /*
    if (localStorage.getItem('user')) {
      this.users = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.users = [];
    }
    */
    this.userService.getAll().subscribe((users) => this.users = users);
  }


}
