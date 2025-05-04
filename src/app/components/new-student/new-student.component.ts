import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getNames } from 'country-list';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

type StudentFormGroup = FormGroup<{
  name: FormControl<string>;
  surname: FormControl<string>;
  country: FormControl<string>;
  gender: FormControl<string>;
  dob: FormControl<string>;
  imageUrl: FormControl<string>;
}>;

@Component({
  selector: 'app-new-student',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {
  studentsServ = inject(StudentService);
  router = inject(Router);
  countries: string[] = [];

  ngOnInit() {
    this.countries = getNames(); // restituisce una lista tipo ['Afghanistan', 'Albania', ...]
  }

  newStudentForm: StudentFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    surname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dob: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    imageUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  addStudent() {
    if (this.newStudentForm.valid) {
      const newStudent = this.newStudentForm.getRawValue(); // oppure .value, se non hai usato `nonNullable`
      console.log('Studente aggiunto:', newStudent);
      this.studentsServ.addStudent({ ...newStudent, id: "", marks: [] });
      this.router.navigate(['/home']);
    } else {
      console.log('Form non valido');
    }
  }
}
