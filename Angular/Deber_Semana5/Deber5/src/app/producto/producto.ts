import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
})
export class Producto implements OnInit {

  productos: any[] = [];         
  productosFiltrados: any[] = []; 
  filtro: string = '';

  constructor(
    private _productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this._productoService.todos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data; 
        this.cdr.detectChanges();
      },
      error: (err) => console.log('❌ Error lista:', err)
    });
  }


  aplicarFiltro(): void {
    const t = this.filtro.trim().toLowerCase();

    if (!t) {
      this.productosFiltrados = this.productos;
      return;
    }

    this.productosFiltrados = this.productos.filter(p =>
      (p.nombre ?? '').toString().toLowerCase().includes(t) ||
      (p.categoria ?? '').toString().toLowerCase().includes(t) ||
      (p.precio ?? '').toString().toLowerCase().includes(t) ||
      (p.stock ?? '').toString().toLowerCase().includes(t)
    );
  }

  limpiarFiltro(): void {
    this.filtro = '';
    this.productosFiltrados = this.productos;
  }

  irNuevo(): void {
    this.router.navigate(['/nuevoProducto']);
  }

  irEditar(id: number): void {
    this.router.navigate(['/nuevoProducto', id]);
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    this._productoService.eliminar(id).subscribe({
      next: () => {
        alert('Producto eliminado');
       
        this.cargarLista();
        this.aplicarFiltro();
      },
      error: (err) => {
        console.log('❌ Error eliminar:', err);
        alert('No se pudo eliminar');
      }
    });
  }
}
