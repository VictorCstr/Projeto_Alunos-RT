import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, of } from 'rxjs';
import { Teacher } from 'src/app/interfaces/Teacher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css'],
})
export class CreateUserFormComponent {
  user!: Teacher;
  form!: FormGroup;
  error$ = new Subject<true>();

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.userService
      .createTeacher(this.form.value)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.error$.next(true);
          return of();
        })
      )
      .subscribe({
        next: () => {
          alert('Usuário criado com sucesso!');
          this.router.navigate(['']);
        },
      });
  }
}
