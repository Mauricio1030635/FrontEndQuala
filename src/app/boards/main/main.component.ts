import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevaEntidadService } from '../../../Services/NuevaEntidad.Service';
import { NuevaEntidadCreateDto, NuevaEntidadDto } from '../../../Models/modelEntidad';
import { NuevaMonedaDto } from '../../../Models/modelMoneda';
import { NuevaMonedaService } from '../../../Services/NuevaMoneda.Service';
import { MatPaginator } from '@angular/material/paginator';

declare var bootstrap: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  user: any;
  nameUser: string = ""
  myForm!: FormGroup;
  entidades!: MatTableDataSource<NuevaEntidadDto>;
  displayedColumns: string[] = ['codigo', 'descripcion', 'direccion', 'identificacion', 'nombreMoneda', 'acciones'];

  isEdit = false;
  currentEntidadId: number | null = null;


  monedas: NuevaMonedaDto[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: ProfileService,
    private fb: FormBuilder,
    private nuevaEntidadService: NuevaEntidadService,
    private nuevaMonedaService: NuevaMonedaService
  ) {

  }


  loadEntidades(): void {
    this.nuevaEntidadService.getAllEntidades().subscribe(data => {
      this.entidades = new MatTableDataSource(data);
      this.entidades.sort = this.sort;
      this.entidades.paginator = this.paginator;
    });
  }


  initForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      direccion: ['', [Validators.required, Validators.maxLength(250)]],
      identificacion: ['', [Validators.required, Validators.maxLength(50)]],
      monedaId: ['', Validators.required],
    });
  }




  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.nameUser = `Welcome ${this.user['name'] || 'Usuario'}`

    this.initForm();
    this.loadMonedas();
    this.loadEntidades();

  }


  loadMonedas(): void {
    this.nuevaMonedaService.getAllMonedas().subscribe(
      (data: NuevaMonedaDto[]) => {
        this.monedas = data;
      },
      (error) => {
        console.error('Error al cargar las monedas', error);
      }
    );
  }



  onAdd(): void {
    this.isEdit = false;
    this.myForm.reset();
    this.currentEntidadId = null;
  }


  onEdit(entidad: NuevaEntidadDto): void {
    this.isEdit = true;
    this.currentEntidadId = entidad.codigo;

    const monedaSeleccionada = this.monedas.find(moneda => moneda.nombreMoneda === entidad.nombreMoneda);
    const monedaId = monedaSeleccionada ? monedaSeleccionada.idMoneda : null;


    this.myForm.patchValue({
      name: entidad.direccion,
      description: entidad.descripcion,
      direccion: entidad.direccion,
      identificacion: entidad.identificacion,
      monedaId: monedaId,
    });
  }




  closeModal(): void {
    const modalElement = document.getElementById('exampleModal')!;
    const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
    modalBootstrap.hide();
  }



  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const nuevaEntidad: NuevaEntidadCreateDto = {
      descripcion: this.myForm.value.description,
      direccion: this.myForm.value.name,
      identificacion: this.myForm.value.description,
      monedaId: this.myForm.value.monedaId,
    };


    if (this.isEdit && this.currentEntidadId) {

      this.nuevaEntidadService.updateEntidad({ ...nuevaEntidad, codigo: this.currentEntidadId }).subscribe(
        () => {

          Swal.fire(
            '¡Modificado!',
            'La entidad ha sido modificada exitosamente.',
            'success'
          );
          this.loadEntidades();
          this.closeModal();

        },
        (error) => console.error('Error al actualizar la entidad', error)
      );
    } else {

      this.nuevaEntidadService.createEntidad(nuevaEntidad).subscribe(
        (response) => {
          Swal.fire(
            '¡Agregado!',
            'La entidad ha sido agregada exitosamente.',
            'success'
          );
          this.loadEntidades();
          this.closeModal();

        },
        (error) => {
          Swal.fire(
            '¡Error!',
            'Hubo un problema al crear la entidad.',
            'error'
          );
        }
      );
    }

  }


  onDelete(codigo: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.nuevaEntidadService.deleteEntidad(codigo).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'La entidad ha sido eliminada exitosamente.',
              'success'
            );
            this.loadEntidades();
          },
          (error) => {
            console.error('Error al eliminar la entidad', error);
            Swal.fire(
              '¡Error!',
              'Hubo un problema al eliminar la entidad.',
              'error'
            );
          }
        );
      }
    });
  }




}
