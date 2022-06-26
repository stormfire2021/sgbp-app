import { Injectable } from '@angular/core';
import { Livro } from '../model/Livros';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErroUtil } from '../util/erro-util';

@Injectable({
  providedIn: 'root'
})
export class ListLivosService {
 private apiUrl = 'http://localhost:3000/livros'

  constructor(private http: HttpClient) { }

  // resgata a lista de livos no json
  getAll(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.apiUrl)
        ;
  }

  //cadastra o livro no json-serve em array proprio
  async addLivro(liv : Livro): Promise<any>{
    try {
      // realiza o post no servidor via httpClient
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          "id": String(Math.round(Math.random() * 100)),
          "livro": liv.livro,
          "autor": liv.autor,
          "editora": liv.editora,
          "tipo": liv.tipo,
          "categoria": liv.categoria
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

  async updateLivro(liv : Livro): Promise<any>{
    try {
      // realiza o post no servidor via httpClient
      const response = await fetch(`${this.apiUrl}/${liv.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "id": liv.id,
          "livro": liv.livro,
          "autor": liv.autor,
          "editora": liv.editora,
          "tipo": liv.tipo,
          "categoria": liv.categoria
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

  async deleteLivro(id:string): Promise<any>{
    console.log("ID:" + id)
    try {
      // realiza o delete no servidor via httpClient
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      })

      if (!response.ok) {
         alert("Ops! Consulta a Fabiula!");
      }else{
        alert("Livro excluído com sucesso!");
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
