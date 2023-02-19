import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ErrorComponent } from './error/error.component';
import { UsuarioDetalleComponent } from './pages/usuario-detalle/usuario-detalle.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ScoreGuard } from './score.guard';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'usuarios' }, 
  { path: 'usuarios', component: UsuariosComponent},   
  { path: 'usuarios/usuario-detalle',component:UsuarioDetalleComponent, canActivate: [ScoreGuard]},   
  { path: '**', component: ErrorComponent} 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
