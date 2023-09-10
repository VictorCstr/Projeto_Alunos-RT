import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { IndexComponent } from './components/index/index.component';
import { ReleaseGradesComponent } from './components/release-grades/release-grades.component';
import { AuthGuard } from './services/guards/not-authenticated.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'grades',
    component: ReleaseGradesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'createUser', component: CreateUserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
