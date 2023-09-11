import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, catchError, of } from 'rxjs';
import { SuccessMessage } from 'src/app/interfaces/SuccessMessage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
  form!: FormGroup;
  error$ = new Subject<boolean>();
  erro!: string;

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.userService
      .login(this.form.value)
      .pipe(
        catchError((error) => {
          this.erro = error.error.message.msg.msg || error.error.message.msg;
          this.error$.next(true);
          return of();
        })
      )
      .subscribe({
        next: (data: any) => {
          const jwt = sessionStorage.setItem('token', data.message as string);
          alert('Usuário logado com sucesso!');
          this.router.navigate(['/grades']);
        },
      });
  }
}
