import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { IPersonalProfesional } from '../models/personal-profesional';

@Injectable({
  providedIn: 'root'
})
export class PersonalProfesionalService {

  /*Api de personal profesional */
  urlAll = 'http://localhost:3050/personal-profesional-all';
  urlCrud = 'http://localhost:3050/personal-profesional';


   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    })
  };

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //Traer todo del personal profesional
  getAllPersonalProfesional(): Observable<any>{

    return this.http.get(this.urlAll)
      .pipe(map(data => data));
  }
  //Crear personal profesional
  createPersonalProfesional(personal: IPersonalProfesional): Observable<any>{
    const params = JSON.stringify(personal);
   // const params = JSON.stringify(personal);
    return this.http.post(this.urlCrud, params, { headers: this.headers })
      .pipe(map(data => data));
  }
   //Eliminar personal profesional
  deletePersonalProfesional(id: string): Observable<any>{
    /*Eliminar un album */
      return this.http.delete(`${this.urlCrud}/` + id, { headers:this.headers });
  }
  //Optener persona profesional
  getPersonalProfesional(id: string): Observable<any> {
    /*Eliminar un album */
    return this.http.get(`${this.urlCrud}/` + id, { headers: this.headers });
  }
  //Actualizar persona profesional
  updatePersonalProfesional(id: string, personal: IPersonalProfesional): Observable<any> {
    const params = JSON.stringify(personal);
    /*Eliminar un album */
    return this.http.put(`${this.urlCrud}/` + id, params ,{ headers: this.headers });
  }
}
