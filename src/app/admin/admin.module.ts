import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from '../gaurds/auth.guard';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatFormFieldModule, MatMenuModule, MatSnackBarModule} from '@angular/material';
import {SemComponent} from './sem/sem.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import {BranchComponent} from './branch/branch.component';
import {RegisterComponent} from './register/register.component';
import {SubjectComponent} from './subject/subject.component';
import {AdminService} from './services/admin.service';
import {adminRoutes} from './admin-routes';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';
import {AdminAuthGuard} from '../gaurds/admin-auth.guard';
import {FillDataComponent} from './fill-data/fill-data.component';

@NgModule({
  declarations: [
    AdminComponent,
    SemComponent,
    BranchComponent,
    RegisterComponent,
    SubjectComponent,
    HeaderComponent,
    LoginComponent,
    VerifyComponent,
    HomeComponent,
    FillDataComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(adminRoutes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [
    AdminService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {
}
