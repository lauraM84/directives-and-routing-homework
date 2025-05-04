import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly BASE_URL = "https://68109d6927f2fdac2412124a.mockapi.io/";
  readonly STUDENTS_ENDPOINT = "students/"

  private readonly _students = signal<Student[]>([]);
  readonly students = this._students.asReadonly();


  constructor(private http: HttpClient, private router: Router) {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.http.get<Student[]>(this.BASE_URL + this.STUDENTS_ENDPOINT)
      .subscribe({
        next: (data) => this._students.set(data),
        error: (err) => console.error('Errore caricamento studenti:', err)
      });
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.BASE_URL + this.STUDENTS_ENDPOINT)
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(this.BASE_URL + this.STUDENTS_ENDPOINT + id)
  }

  deleteStudent(id: string): void {
    this.http.delete(`${this.BASE_URL}${this.STUDENTS_ENDPOINT}${id}`)
      .subscribe({
        next: () => {
          this._students.update(list => list.filter(student => student.id !== id));
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Errore durante l\'eliminazione dello studente', err)
      });
  }

  addMarks(id: string, marks: number[]): void {
    const patchValue = { marks };

    this.http.put<Student>(`${this.BASE_URL}${this.STUDENTS_ENDPOINT}${id}`, patchValue)
      .subscribe({
        next: (updatedStudent) => {
          this._students.update(list =>
            list.map(student => student.id === id ? updatedStudent : student)
          );
        },
        error: (err) => console.error('Errore aggiornamento voti', err)
      });
  }


  addStudent(student: Student): void {
    this.http.post<Student>(this.BASE_URL + this.STUDENTS_ENDPOINT, student)
      .subscribe({
        next: (newStudent) => {
          console.log('Studente aggiunto:', newStudent);
          this._students.update(list => [...list, newStudent]);
        },
        error: (err) => console.error(err)
      });
  }
}
