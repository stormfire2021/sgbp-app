import { Livro } from './../model/Livros';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultarService {
  private apiUrl = 'http://localhost:3000/livros'

  constructor(private http: HttpClient) {

   }

   // resgata a lista de livos no json
getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
}

getLivroCategoria(cat:String): Observable<Livro[]> {
  return this.http.get<Livro[]>(`${this.apiUrl}?categoria=${cat}`);
}


}
