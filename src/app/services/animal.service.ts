import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from '../models/animal';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  myAppUrl = 'https://localhost:7265/';
  myApiUrl = 'api/Animals/';
  list: any;
  private actualizarFormulario = new BehaviorSubject<Animal>({} as any);

  constructor(private http: HttpClient) { }

  guardarAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.myAppUrl + this.myApiUrl, animal);
  }

  obtenerListadoAnimales() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise().then(data => {
      this.list = data as Animal[];
    });
  }

  eliminarAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(this.myAppUrl + this.myApiUrl + id);
  }

  actualizar(animal: Animal) {
    this.actualizarFormulario.next(animal);
  }

  obtenerAnimal(): Observable<Animal> {
    return this.actualizarFormulario.asObservable();

  }

  actualizarAnimal(id?: number, animal?: Animal): Observable<Animal> {
    return this.http.put<Animal>(this.myAppUrl + this.myApiUrl + id, animal);
  }
}
