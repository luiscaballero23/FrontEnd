import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { animationFrameScheduler } from 'rxjs';

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.css']
})
export class ListAnimalComponent implements OnInit {

  constructor(public animalService: AnimalService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.animalService.obtenerListadoAnimales();
  }

  eliminarAnimal(id: number) {
    if (confirm('Desea eliminar el registro')) {
      this.animalService.eliminarAnimal(id).subscribe(data => {
        this.toastr.warning('Datos eliminados con exito', 'El animal fue elimiado...');
        this.animalService.obtenerListadoAnimales();
      })
    }
  }

  editarAnimal(animal: Animal) {
    this.animalService.actualizar(animal);
  }

}
