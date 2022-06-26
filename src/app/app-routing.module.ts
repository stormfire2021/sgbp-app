import { UserComponent } from './user/user.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './login/login.component';
import { LivroComponent } from './livro/livro.component';
import { LivroListComponent } from './livro-list/livro-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentralComponent } from './central/central.component';
import { ConsultarComponent } from './consultar/consultar.component';


const routes: Routes = [
  { path: '', component: CentralComponent },
  //{ path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LivroListComponent },
  { path: 'livro', component: LivroComponent },
  { path: 'search', component: ConsultarComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'user', component: UserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
