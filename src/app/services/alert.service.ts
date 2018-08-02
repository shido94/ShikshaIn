import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snachbar: MatSnackBar) {
  }

  success(message: string, duration: number = 1000) {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    // config.panelClass = ['blue-snackbar'];
    this.snachbar.open(message, null, config);
  }

  error(message: string, duration: number = 2000) {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    // config.panelClass = ['blue-snackbar'];
    this.snachbar.open(message, null, config);
  }


}
