import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CentralComponent } from './central/central.component';
import { LivroComponent } from './livro/livro.component';
import { LivroListComponent } from './livro-list/livro-list.component';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ConsultarComponent } from './consultar/consultar.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    CentralComponent,
    LivroComponent,
    LivroListComponent,
    LoginComponent,
    UserComponent,
    CategoriaComponent,
    ConsultarComponent,
  ] ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
