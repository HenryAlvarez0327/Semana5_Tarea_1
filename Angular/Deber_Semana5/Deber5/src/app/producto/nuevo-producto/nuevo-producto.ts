import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './nuevo-producto.html',
  styleUrls: ['./nuevo-producto.css'],
})
export class NuevoProducto implements OnInit {

  esEditar = false;
  idProducto = 0;

  frmProducto: FormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    precio: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categoria: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });

  constructor(
    private _productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('✅ NuevoProducto cargó');

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      console.log('🧩 ID URL:', id);

      if (id > 0) {
        this.esEditar = true;
        this.idProducto = id;
        this.cargarProducto(id);
      } else {
        this.esEditar = false;
        this.idProducto = 0;
      }
    });
  }

  cargarProducto(id: number): void {
    console.log('📡 Pidiendo producto:', id);

    this._productoService.uno(id).subscribe({
      next: (data) => {
        console.log('✅ DATA:', data);

        this.frmProducto.patchValue({
          id: data.id,
          nombre: data.nombre,
          precio: data.precio,
          stock: data.stock,
          categoria: data.categoria
        });

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('❌ Error cargar:', err);
        alert('No se pudo cargar producto');
      }
    });
  }

  guardar(): void {
    if (this.frmProducto.invalid) {
      this.frmProducto.markAllAsTouched();
      return;
    }

    const v = this.frmProducto.getRawValue();

    const productoModel = {
      id: this.esEditar ? this.idProducto : 0,
      nombre: (v.nombre ?? '').toString().trim(),
      precio: Number(v.precio),
      stock: Number(v.stock),
      categoria: (v.categoria ?? '').toString().trim(),
    };

    if (this.esEditar) {
      this._productoService.editar(productoModel).subscribe({
        next: () => {
          alert('Producto actualizado');
          this.router.navigate(['/producto']);
        },
        error: (err) => {
          console.log('❌ Error actualizar:', err);
          alert('No se pudo actualizar');
        }
      });
      return;
    }

    this._productoService.nuevo(productoModel).subscribe({
      next: () => {
        alert('Producto guardado');
        this.router.navigate(['/producto']);
      },
      error: (err) => {
        console.log('❌ Error guardar:', err);
        alert('No se pudo guardar');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/producto']);
  }
}
