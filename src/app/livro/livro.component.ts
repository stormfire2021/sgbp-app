import { Categoria } from './../model/Categorias';
import { Livro } from '../model/Livros';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListCategoriasService } from '../service/list-categorias.service';
import { NgForm } from '@angular/forms';
import { ListLivosService } from '../service/list-livos.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent implements OnInit {
  @ViewChild('formLivro') formLivro!: NgForm;
   /*
   * array que recebe tanto do localStorage quanto do json-server
   * ele recebe a lista do metodo getCategoria()
   */
  categorias?: Categoria[] = [];

  //variavel q recebe e preenche os dados do formLivro
  liv!: Livro;
  /*
   * array que recebe tanto do localStorage quanto do json-server
   * ele recebe a lista do metodo getCategoria()
   */
  livs: Livro[];

  /*
   * array que recebe dentro do metodo onDelete
   * um localStorage com filtro para fazer o delete do registro no localStorage
   */
  livsModify?: Livro[];

  //variavel q verifica se o metodo é update ou não
  update: boolean = false;

  //variavel guarda o nome do livro em caso do update do nome
  nomeLivro!: string;


  constructor( private listCategoria : ListCategoriasService, private listaService : ListLivosService) {
    this.livs = [];
    this.getCategorias();
    this.getLivros();
  }


  /* construtor para uso com localstorage
  constructor() {
    this.livs = [];
    this.getCategorias();
    this.getLivros();
  }
  */
  ngOnInit(): void {
    this.liv = new Livro('', '', '', '', '');
    this.getLivros();
  }

  onSubmit() {
    /*
    if (this.update) {
      this.livs = this.livs.filter((l) => {
        return l.livro?.valueOf() != this.nomeLivro?.valueOf();
      });

      this.livs.push(this.liv);
      localStorage.setItem('livros', JSON.stringify(this.livs));
      window.alert('Alteração realizada com sucesso!');
      this.update = false;
    } else {
      this.livs.push(this.liv);
      localStorage.setItem('livros', JSON.stringify(this.livs));
      window.alert('Cadastro realizado com sucesso!');
    }
    this.formLivro.reset();
    this.liv = new Livro('', '', '', '', '');
    this.livs = JSON.parse(localStorage.getItem('livros')!);
     */

    if(this.update){
      this.listaService.updateLivro(this.liv);
      this.liv = new Livro('', '', '', '', '');
      this.formLivro.reset();
      this.update = false;
    }else{
      this.listaService.addLivro(this.liv);
      this.liv = new Livro('', '', '', '', '');
      this.formLivro.reset();
    }
    this.listaService.getAll().subscribe((livs) => this.livs = livs);

  }

  onUpdate(liv: Livro) {
    let livro = Livro.clone(liv);
    livro.id = liv.id;
    this.liv = livro;
    this.update = true;
    this.nomeLivro = liv.livro;
  }

  onDelete(livro: Livro): void {
    let confirmacao = window.confirm(
      'Remalmente deseja remover este livro : ' + livro.livro
    );
    /*
    if (!confirmacao) {
      return;
    } else {
      this.livsModify = this.livs.filter((l) => {
        return l.livro?.valueOf() != this.nomeLivro?.valueOf();
      });

      localStorage.setItem('livros', JSON.stringify(this.livsModify));
      this.livs = JSON.parse(localStorage.getItem('livros')!);
    } */

    if (!confirmacao) {
      return;
    } else {
      this.listaService.deleteLivro(livro.id);
      this.liv = new Livro('', '', '', '', '');

    }
    this.listaService.getAll().subscribe((livs) => this.livs = livs);
  }

  getCategorias(): void {
     /*
    if (localStorage.getItem('categorias')) {
      this.categorias = JSON.parse(localStorage.getItem('categorias')!);
    } else {
      this.categorias = [];
    }
    */
   this.listCategoria.getAll().subscribe((categorias) => this.categorias = categorias);
  }

  getLivros(): void {
    /*
    if (localStorage.getItem('livros')) {
      this.livs = JSON.parse(localStorage.getItem('livros')!);
    } else {
      this.livs = [];
    }
    */

    this.listaService.getAll().subscribe((livs) => this.livs = livs);
  }
}
