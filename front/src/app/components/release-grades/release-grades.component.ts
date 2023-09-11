import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, of } from 'rxjs';
import { io } from 'socket.io-client';
import { Teacher } from 'src/app/interfaces/Teacher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-release-grades',
  templateUrl: './release-grades.component.html',
  styleUrls: ['./release-grades.component.css'],
})
export class ReleaseGradesComponent {
  user!: Teacher;
  form!: FormGroup;
  error$ = new Subject<true>();
  socket = io('http://localhost:9090');
  erro!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      school: ['', [Validators.required]],
      activityName: ['', [Validators.required]],
      grade: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.userService
      .releaseGrades(this.form.value)
      .pipe(
        catchError((error) => {
          console.error(error.error);
          this.erro = error.error.error;
          this.error$.next(true);
          return of();
        })
      )
      .subscribe({
        next: () => {
          alert('Nota lançada com sucesso!');
          this.router.navigate(['']);
        },
      });
  }
}
