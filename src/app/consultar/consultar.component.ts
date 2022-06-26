import { Categoria } from './../model/Categorias';
import { Livro } from '../model/Livros';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListCategoriasService } from '../service/list-categorias.service';
import { NgForm } from '@angular/forms';
import { ConsultarService } from '../service/consultar.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
 /*
   * array que recebe tanto do localStorage quanto do json-server
   * ele recebe a lista do metodo getCategoria()
   */
 categorias?: Categoria[] = [];

//variavel q recebe e preenche os dados do form
cat!: string;
/*
 * array que recebe tanto do localStorage quanto do json-server
 * ele recebe a lista do metodo getCategoria()
 */
livs: Livro[];

  constructor(private listCategoria: ListCategoriasService, private consultar : ConsultarService) {
    this.livs = [];
    this.getCategorias();
  }

  ngOnInit(): void {
    this.cat = ''
  }

  onSearch(){

    this.consultar.getLivroCategoria(this.cat).subscribe((livs) => this.livs = livs)
    this.cat = '';

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

 limpar(){
  this.livs = []
 }

}
