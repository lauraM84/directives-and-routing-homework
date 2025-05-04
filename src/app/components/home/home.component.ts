import { Component, computed, inject, signal } from '@angular/core';
import { Student } from '../../model/student';
import { StudentService } from '../../services/student/student.service';
import { StudentCardComponent } from '../student-card/student-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [StudentCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  studentServ = inject(StudentService);

  readonly students = computed(() => {
    const students = this.studentServ.students();
    return [...students].sort((a, b) => a.name.localeCompare(b.name));
  });


}
