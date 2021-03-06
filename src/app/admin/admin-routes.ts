import {Routes} from '@angular/router';
import {VerifyComponent} from './verify/verify.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FillDataComponent} from './fill-data/fill-data.component';
import {SemComponent} from './sem/sem.component';
import {PendingComponent} from './pending/pending.component';
import {FilesComponent} from './files/files.component';
import {UserMessageComponent} from './user-message/user-message.component';


export const adminRoutes: Routes = [
  {
    path: 'admin/verify',
    component: VerifyComponent
  },
  {
    path: 'admin/register',
    component: RegisterComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin/home',
    component: HomeComponent
  },
  {
    path: 'admin/data',
    component: FillDataComponent
  },
  {
    path: 'admin/post',
    component: SemComponent
  },
  {
    path: 'admin/data/pending',
    component: PendingComponent
  },
  {
    path: 'admin/data/pending/:id',
    component: FilesComponent
  },
  {
    path: 'admin/data/pending/file/message',
    component: UserMessageComponent
  }
];
