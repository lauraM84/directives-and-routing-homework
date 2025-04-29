import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-card',
  imports: [RouterLink],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input({required: true, alias: 'student-info'}) student!: Student
}
