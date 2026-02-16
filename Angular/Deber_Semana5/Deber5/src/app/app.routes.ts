import { Routes } from '@angular/router';
import { Producto } from './producto/producto';
import { NuevoProducto } from './producto/nuevo-producto/nuevo-producto';

export const routes: Routes = [
  { path: '', redirectTo: 'producto', pathMatch: 'full' },

  { path: 'producto', component: Producto },

  { path: 'nuevoProducto', component: NuevoProducto },
  { path: 'nuevoProducto/:id', component: NuevoProducto },

  { path: '**', redirectTo: 'producto' }
];
