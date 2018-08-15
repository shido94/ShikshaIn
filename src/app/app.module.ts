import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import {myRoutes} from './routes';
import { HomepageComponent } from './homepage/homepage.component';
import { FlexAlignmentDirective } from './directives/flex-alignment.directive';
import { BranchComponent } from './branch/branch.component';
import { SearchComponent } from './search/search.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { SemesterComponent } from './semester/semester.component';
import { SubjectComponent } from './subject/subject.component';
import { DetailsComponent } from './details/details.component';
import { StarComponent } from './star/star.component';
import { FiveStarComponent } from './five-star/five-star.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {UserServiceService} from './services/user-service.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './gaurds/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatSnackBarModule} from '@angular/material';
import {AdminModule} from './admin/admin.module';
import {AdminAuthGuard} from './gaurds/admin-auth.guard';
import {DashboardComponent} from './users/dashboard/dashboard.component';
import {UploadComponent} from './upload/upload.component';
import {HeaderComponent} from './header/header.component';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import { ProfileComponent } from './users/profile/profile.component';
import {UploadInfoComponent} from './users/upload-info/upload-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FlexAlignmentDirective,
    BranchComponent,
    SearchComponent,
    DisplayDataComponent,
    SemesterComponent,
    SubjectComponent,
    DetailsComponent,
    StarComponent,
    FiveStarComponent,
    ViewPdfComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UploadComponent,
    HeaderComponent,
    ProfileComponent,
    UploadInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(myRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    AdminModule,
    NgbModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    UserServiceService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
