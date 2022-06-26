import { Livro } from './../model/Livros';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categorias';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErroUtil } from '../util/erro-util';


@Injectable({
  providedIn: 'root'
})
export class ListCategoriasService {
  private apiUrl = 'http://localhost:3000/categorias'
  private apiUrl2 = 'http://localhost:3000/livros?categoria'


  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl)
        .pipe(catchError(ErroUtil.handleError));
  }


  //cadastra a categoria no json-serve em array proprio
  async addCategoria(cat : Categoria): Promise<any>{

    try {
      // realiza o post no servidor via httpClient
      const response = await fetch(`${this.apiUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          "id": String(Math.round(Math.random() * 50)),
          "categoria": cat.categoria
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
         alert("Ops! Consulta a Fabiula!");
      }else{
        alert("Cadastro efetuado com sucesso!");
      }

    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);

      } else {
        console.log('unexpected error: ', error);

      }
    }
  }

  async updateCategoria(cat : Categoria): Promise<any>{

    try {
      // realiza o post no servidor via httpClient
      const response = await fetch(`${this.apiUrl}/${cat.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "id": cat.id,
          "categoria": cat.categoria
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
         alert("Ops! Consulta a Fabiula!");
      }else{
        alert("Alteração efetuado com sucesso!");
      }

    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);

      } else {
        console.log('unexpected error: ', error);

      }
    }
  }

  async deleteCategoria(id:string): Promise<any>{
    console.log("ID:" + id)
    try {
      // realiza o post no servidor via httpClient
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })

      if (!response.ok) {
         alert("Ops! Consulta a Fabiula!");
      }else{
        alert("Cadastro excluido com sucesso!");
      }

    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);

      } else {
        console.log('unexpected error: ', error);

      }
    }
  }


}
