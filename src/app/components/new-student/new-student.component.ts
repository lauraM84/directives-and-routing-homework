import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-student',
  imports: [ReactiveFormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {
  studentsServ = inject(StudentService);

  newStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
  });

  addStudent(){

  }
}
