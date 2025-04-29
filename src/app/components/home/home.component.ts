import { Component, inject } from '@angular/core';
import { Student } from '../../model/student';
import { StudentService } from '../../services/student/student.service';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-home',
  imports: [ StudentCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  students: Student[] = [];

  studentServ = inject(StudentService);

  constructor(){
    this.studentServ.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error(err),      
    })
  }

  orderByName(){
    if(!this.students.length) return
    this.students = this.students.sort((s1, s2) => s1.name.localeCompare(s2.name))
  }
}
