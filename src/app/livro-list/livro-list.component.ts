import { Livro } from './../model/Livros';
import { Component,  OnInit } from '@angular/core';
import { ListLivosService } from './../service/list-livos.service';
@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})

export class LivroListComponent implements OnInit {
  livros: Livro[] = [];
  displayedColumns = ['id', 'livro', 'autor', 'editora', 'tipo', 'categoria'];
  /*
  constructor(private listLivros: ListLivosService) {
      this.getLivros();
   }
  */
   constructor() {
    this.getLivros();
 }

  ngOnInit(): void {
  }

  getLivros(): void {

    if (localStorage.getItem('livros')) {
      this.livros = JSON.parse(localStorage.getItem('livros')!);
    } else {
      this.livros = [];
    }

   /*
   this.listLivros.getAll().subscribe((livros) => this.livros = livros);
   */
  }

}
