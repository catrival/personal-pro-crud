import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPersonalProfesional } from 'src/app/models/personal-profesional';
import { PersonalProfesionalService } from 'src/app/services/personal-profesional.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  /*Grupo */
  formG: FormGroup;

  sex: string = '';
  tablePersonalProfesional: IPersonalProfesional[] =[];

  tableLoaded = false;
  //Si el formulario es para modificar
  isEdit = false;
  currDate: string;

  constructor(private fb: FormBuilder, private personalProfesional: PersonalProfesionalService) {
    /*Creamos el formulario */
    this.createForm();
    this.loadDataToTable();
    //this.createListeners();
  }


  ngOnInit(): void {
    this.sex =  'M';

  }
  /*Una forma de obtener una propiedad procesando la información */
  invalidInput(input: string): boolean{
    return this.formG.get(input).invalid && this.formG.get(input).touched;
  }
  //Verificar si existe cédula
  verifyCC(): boolean{
     const exist = this.tablePersonalProfesional.find( element => element.cedula === this.formG.get('cedula').value);
    return (typeof exist === "undefined" || this.isEdit) ? false : true;
  }

  /*Crear formulario */
  createForm(): void {
    this.formG = this.fb.group({
      cedula: ['', Validators.required],
      nombreCompleto: ['', Validators.required ],
      fecha_nacimiento: ['', Validators.required],
      profesion: ['', Validators.required],
      direccion: ['', Validators.required],
      municipio: ['', Validators.required],
      telefono: ['', Validators.required],
      vehiculo: [''],
      marca: [''],
      anio: ['']
     }
    );
  }
  /*Cargar data */
  loadDataToTable(){
    //Le asignamos el valor al arreglo
    this.personalProfesional.getAllPersonalProfesional().toPromise().then(data => {
      //Hacer la simulación de espera
      setTimeout(() => {
        this.tablePersonalProfesional = data;
        this.tableLoaded = true;
      }, 1000);
    },
    error => {
      console.error('Control Error,', error);
    });
  }
  /*Almacenar info */
  save(editForm: boolean = false): void{

    //Si el formulario es de tipo edicición
    this.isEdit = (editForm) ? true : false;
    if(this.isEdit){
      this.formG.controls['cedula'].disable();
    }else{
      this.formG.controls['cedula'].enable();
    }
    /*Si el formulario es inválido */
    if (this.formG.invalid && !this.verifyCC()) {
      Object.values(this.formG.controls).forEach(control => {

        /*Si tiene un form Group en su interior */
        if (control instanceof FormGroup) {
          /*Realizamos un recorrido al sub-grupo->función flecha */
          Object.values(control.controls).forEach(controlFG => controlFG.markAsTouched());
        }else{
          /*Setiamos todos los campos a tocados */
          control.markAsTouched();
        }
      });
    }else{
      //Para guardar persona profesioanl
      const personaProfesional: IPersonalProfesional = {
        cedula: this.formG.get('cedula').value,
        nombre_completo: this.formG.get('nombreCompleto').value,
        fecha_nacimiento: this.formG.get('fecha_nacimiento').value,
        profesion: this.formG.get('profesion').value,
        direccion: this.formG.get('direccion').value,
        municipio: this.formG.get('municipio').value,
        telefono: this.formG.get('telefono').value,
        sexo: this.sex,
        vehiculo: this.formG.get('vehiculo').value || '',
        marca: this.formG.get('marca').value || '',
        anio: this.formG.get('anio').value || 0
      };
      if (!editForm){
        this.onCreate(personaProfesional);
      }else{
        console.log('----------Entra a actualizar ----------')
        const cc: string = personaProfesional.cedula;
        //la cédula la indefinimos
        personaProfesional.cedula = undefined;
        this.onUpdate(cc,personaProfesional);
      }
      /*Con esto reiniciamos la info. vaciando después de realizar algo en el formulario*/
      this.formG.reset({
      });
    }
  }
  //Crear
  onCreate(personal: IPersonalProfesional){
    this.tableLoaded = false;
    //Le asignamos el valor al arreglo
    this.personalProfesional.createPersonalProfesional(personal).toPromise().then(data => {
      //Hacer la simulación de espera
      setTimeout(() => {
        //Volvemos a listar el datatatable
        this.loadDataToTable();
      }, 1000);
    },
      error => {
        console.error('Control Error,', error);
      });
  }
  //Actualizar personal profesional
  onUpdate(cc: string,personal: IPersonalProfesional){
    this.tableLoaded = false;
    //Le asignamos el valor al arreglo
    this.personalProfesional.updatePersonalProfesional(cc,personal).toPromise().then(data => {
      console.log('Modificada', data);
      //Hacer la simulación de espera
      setTimeout(() => {
        //Deja de ser editable
        this.isEdit = false;
        //Volvemos a listar el datatatable
        this.loadDataToTable();
      }, 1000);
    },
    error => {
      console.error('Control Error,', error);
    });
  }
  //Eliminar personal
  deletePersonalP(id: string){
    this.tableLoaded = false;
    //Le asignamos el valor al arreglo
    this.personalProfesional.deletePersonalProfesional(id).toPromise().then(data => {
      //Hacer la simulación de espera
      setTimeout(() => {
        //Volvemos a listar el datatatable
        this.loadDataToTable();
      }, 1000);
    },
      error => {
        console.error('Control Error,', error);
      });
  }
  //Reiniciar para crear nuevo formulario
  onReset(){
    this.isEdit = false;
    //Habilitamos nuevamente
    this.formG.controls['cedula'].enable();
    /*Con esto reiniciamos la info. vaciando después de cargar el formulario*/
    this.formG.reset({
    });
  }
  //Obtener un personal profesional
  getPersonalP(id: string){
    this.isEdit = true;
    this.formG.controls['cedula'].disable();
    //Le asignamos el valor al arreglo
    this.personalProfesional.getPersonalProfesional(id).toPromise().then(data => {
      //Posamos el scroll en la parte de arriba
      document.getElementById('formTop').scrollIntoView();
      const newPersonal: IPersonalProfesional = data[0];
      //Asignamos los valores nuevos
      this.formG.reset({
        cedula: newPersonal.cedula,
        nombreCompleto: newPersonal.nombre_completo,
        fecha_nacimiento: formatDate(newPersonal.fecha_nacimiento, 'yyyy-MM-dd', 'en'),
        profesion: newPersonal.profesion,
        direccion: newPersonal.direccion,
        municipio: newPersonal.municipio,
        telefono: newPersonal.telefono,
        vehiculo: newPersonal.vehiculo || '',
        marca: newPersonal.marca || '',
        anio: newPersonal.anio || ''
      });
      this.sex = newPersonal.sexo;
    },
    error => {
      console.error('Control Error,', error);
    });
  }
}
