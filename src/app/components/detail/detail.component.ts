import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  marks?: number[];

  myForm = new FormGroup({
    mark: new FormControl(''),
  });

  route = inject(ActivatedRoute);
  studentServ = inject(StudentService);

  student?: Student;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.studentServ.getStudent(id).subscribe({
        next: (data) => {
          this.student = data;
          this.marks = data.marks;
        },
        error: (err) => console.error(err),
      })
    }
  }

  removeStudent(id: string) {
    this.closeDialog;
    this.studentServ.deleteStudent(id);
  }

  openDialog() {
    document.querySelector("dialog")?.showModal();
  }

  closeDialog() {
    document.querySelector("dialog")?.close();
  }

  addMark() {
    console.log(this.marks);
    const newMark = this.myForm.value.mark;
    console.log(newMark);
    if (this.marks) {
      this.marks.push(Number(newMark));
      console.log(this.marks);
      this.addMarksToStudent(this.marks); //addMarksToStudent oppure addMarksToStudentObservable
    }
    this.myForm.reset();
  }

  addMarksToStudent(newMarks: number[]) {
    if (this.student) {
      this.studentServ.addMarks(this.student.id, newMarks);
    }
  }

}
