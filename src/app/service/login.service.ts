import { Observable, Observer, Subject } from 'rxjs';


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSource = new Subject<boolean>();
  //login$ = this.loginSource.asObservable();

  constructor(private router: Router) {}

  login() {
    localStorage.setItem('logado', JSON.stringify('accept'))
    this.loginSource.next(true);
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('logado');
    this.loginSource.next(false);
    this.router.navigate(['']);
  }

  asObservable(): Observable<boolean> {
    return this.loginSource;
    //return this.loginSource.asObservable()
  }
}
