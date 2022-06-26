import { ListLivosService } from './../service/list-livos.service';
import { ListCategoriasService } from './../service/list-categorias.service';
import { Categoria } from './../model/Categorias';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Livro } from '../model/Livros';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  @ViewChild('formCategoria') formCategoria!: NgForm;

  cat!: Categoria;
  categorias: Categoria[];
  categoriasModify?: Categoria[];
  nomeCat!: string;

  livs: Livro[];
  check: number;

  //variavel q verifica se o metodo é update ou não
  update: boolean = false;

  constructor(private listCategoria: ListCategoriasService,
    private listLivros: ListLivosService) {

    this.livs = [];
    this.categorias = [];
    this.check = 0;
  }

  /*construtor para trabalhar com localstorage
  constructor() {
    this.categorias = [];
    this.getCategorias();
  }
   */

  ngOnInit(): void {
    this.cat = new Categoria('');
    this.getLivros();
    this.getCategorias();

  }

  onSubmit(): void {
    /* atribuições para trabalhar com localStorage
    //verifica se é update
    if (this.update) {
      console.log('nomeCategoria '+ this.nomeCat )
      this.categorias = this.categorias.filter((c) => {
        return c.categoria?.valueOf() != this.nomeCat?.valueOf();
      });

      this.categorias.push(this.cat);
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
      //this.showConfirm('Sucesso', 'Alteração realizada com sucesso!');
      window.alert('Alteração realizada com sucesso!');
      this.update = false;
      this.nomeCat = '';
    } else {
      this.categorias.push(this.cat);
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
      //this.showConfirm('Sucesso', 'Cadastro realizado com sucesso!');
      window.alert('Cadastro realizado com sucesso!');
    }
    this.formCategoria.reset();
    this.cat = new Categoria('');

    this.categorias = JSON.parse(localStorage.getItem('categorias')!);
    */
    if (this.update) {
      this.listCategoria.updateCategoria(this.cat);
      this.formCategoria.reset();
      this.update = false;
    }else{
      this.listCategoria.addCategoria(this.cat);
      this.formCategoria.reset();
    }
    this.listCategoria
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  onUpdate(cat: Categoria) {
    let categoria = Categoria.clone(cat);
    categoria.id = cat.id;
    this.cat = categoria;
    this.update = true;
    this.nomeCat = cat.categoria;
  }

  onDelete(cat: Categoria) {
    /* atribuições para trabalhar com localStorage
    let confirmacao = window.confirm(
      'Remalmente deseja remover esta categoria : ' + cat.categoria
    );

    if (!confirmacao) {
      return;
    } else {
      this.categoriasModify = this.categorias.filter((c) => {
        return c.categoria?.valueOf() != cat.categoria?.valueOf();
      });

      localStorage.setItem('categorias', JSON.stringify(this.categoriasModify));
      this.categorias = JSON.parse(localStorage.getItem('categorias')!);
    }
    */

    let confirm = window.confirm(
      'Deseja Realmente remover a categoria' + cat.id
    );

    if (!confirm) {
      return;
    } else {
      // verifica se a categoria a ser deletada não possui livros cadastrados
      for (let u of this.livs) {
        if (u.categoria?.valueOf() == cat.categoria?.valueOf()) {
          this.check++;
        }
      }
      if (this.check > 0) {
        alert(
          'Não foi possivél deletar a categoria \n' +
            'Livros cadastrados com esta categoria'
        );
      } else {
        this.listCategoria.deleteCategoria(cat.id);

      }
      this.check = 0;

    }
    this.listCategoria
    .getAll()
    .subscribe((categorias) => (this.categorias = categorias));
}

  getCategorias(): void {
    /* atribuições para trabalhar com json-server
    if (localStorage.getItem('categorias')) {
      this.categorias = JSON.parse(localStorage.getItem('categorias')!);
    } else {
      this.categorias = [];
    }
     */

    this.listCategoria
      .getAll()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  getLivros(): void {
    this.listLivros.getAll().subscribe((livs) => (this.livs = livs));

    for (let u of this.livs) {
      console.log(u.livro + 'filtro');
    }
  }
}
