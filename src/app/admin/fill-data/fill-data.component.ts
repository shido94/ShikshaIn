import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {EventBusService} from '../../services/event-bus.service';
import {AdminService} from '../services/admin.service';


@Component({
  selector: 'app-fill-data',
  templateUrl: './fill-data.component.html',
  styleUrls: ['./fill-data.component.css']
})
export class FillDataComponent implements OnInit {

  public orderForm: FormGroup;

  constructor(private router: Router,
              private adminService: AdminService,
              private eventBus: EventBusService,
              private alertService: AlertService,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      branchImg: [null, Validators.required],
      branch_name: [null, Validators.required],
      semester: [null, Validators.required],
      subject: this.formBuilder.array([this.createItem()])
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.orderForm.patchValue({
          branchImg: reader.result
        });

        // // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      subject_name: [null, Validators.required]
    });
  }

  get items(): FormArray {
    return this.orderForm.get('subject') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  OnSubmit(formValue: any) {
    console.log(formValue);
    const obs = this.adminService.dataSubmitAdmin(formValue);
    obs.subscribe(data => {
        console.log(data);
        if (data.success) {
          this.eventBus.announce('LOGIN_SUCCESS');
          this.router.navigate(['/admin/home']);
          this.alertService.success('successfully Submit');
        }
      },
      error => {
        this.alertService.error('Some error');
      });
  }
}
