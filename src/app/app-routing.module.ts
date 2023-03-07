import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdenesComponent } from './Componentes/list-ordenes/list-ordenes.component';
import { OrdenComponent } from './Componentes/orden/orden.component';

const routes: Routes = [
  { path: '', component: ListOrdenesComponent },
  { path: 'orden/:id', component: OrdenComponent },
  { path: '**', component: ListOrdenesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
