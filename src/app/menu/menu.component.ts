import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild('mobile') sideNav?: ElementRef;

  logado = false;
  subscription!: Subscription;

  constructor(private router: Router, private loginService: LoginService) {

    this.subscription = this.loginService.asObservable().subscribe((data) => {
      this.logado = data;
      console.log('logado'+ this.logado);
      console.log('observer - land-page' + this.subscription);
    });
  }

  ngOnInit(): void {
    this.logado = JSON.parse(localStorage.getItem('logado')!);
    console.log('init - land-page'+ this.logado);

  }

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav?.nativeElement);
  }


  loggof(): void{
    this.loginService.logout();
  }

}
