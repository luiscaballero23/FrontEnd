import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  animal: Animal;
  idAnimalTemp?: number = 0;
  constructor(private formBuilder: FormBuilder, private animalService: AnimalService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      idAnimal: 0,
      numero: ['', [Validators.required]],
      numeroRaya: ['', [Validators.required]],
      idRaza: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subscription = this.animalService.obtenerAnimal().subscribe(data => {
      console.log(data);
      this.animal = data;
      this.form.patchValue({
        numero: this.animal.numero,
        numeroRaya: this.animal.numeroRaya,
        idRaza: this.animal.idRaza,
      });
      this.idAnimalTemp = this.animal.idAnimal;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  guardarAnimal() {
    if (this.idAnimalTemp == 0) {
this.agregar();
    } else {
this.editar();
    }



  }

  agregar() {
    const animal: Animal = {
      numero: this.form.get('numero')?.value,
      numeroRaya: this.form.get('numeroRaya')?.value,
      idRaza: this.form.get('idRaza')?.value
    }

    this.animalService.guardarAnimal(animal).subscribe(data => {
      this.toastr.success('Datos guardados con exito', 'El animal fue agregado...');
      this.animalService.obtenerListadoAnimales();
      this.form.reset();
    })
  }

  editar(){
    const animal: Animal = {
      idAnimal: this.animal.idAnimal,
      numero: this.form.get('numero')?.value,
      numeroRaya: this.form.get('numeroRaya')?.value,
      idRaza: this.form.get('idRaza')?.value
    }

    this.animalService.actualizarAnimal(this.idAnimalTemp, animal).subscribe(data => {
      this.toastr.info('Datos actualizados con exito', 'El animal fue actualizado...');
      this.animalService.obtenerListadoAnimales();
      this.form.reset();
      this.idAnimalTemp = 0;
    })
  }
}
