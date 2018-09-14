import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {UserServiceService} from '../services/user-service.service';
import {Observable} from 'rxjs';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {Router} from '@angular/router';

const URL = 'http://localhost:3000/user/upload';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  result: any = [];

  image = '';

  condition = true;
  uploadButton = true;

  public search: any;

  public uploader: FileUploader = new FileUploader({itemAlias: 'photo'});

  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router) {
  }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      types: ['notes', Validators.required],
      branch: ['computer science and engineering', Validators.required],
      course: ['B-Tech', Validators.required],
      university: ['Abdul kalam azaad technical university', Validators.required],
      doc_of_college: ['krishna institute of engineering and technology', Validators.required],
      document       : [null, Validators.required],
      semester: ['3', Validators.required],
      subject: [null, Validators.required],
      topic_covered: this.formBuilder.array([this.createItem()])
    });

    this.search = (text$: Observable<string>) => text$.pipe(
      // debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 3 ? []
        : this.result.filter(v => {
          // console.log('v ', v);
          return v;
        }).slice(0, 10))
    );

  }

  ////  Searched Subject  //////////////

  valueUpdate(sub, branch, semester) {
    // console.log('event ', sub, branch, semester);
    if (sub.length > 3) {
      const obs$ = this.userService.subjectData(sub, branch, semester);
      obs$.subscribe(value => {
        console.log(value);
        this.result = value;
      });
    }
  }

  ///// Upload Image///////////

  uploadFile($event) {
    this.condition = true;
    this.uploadButton = true;
    this.image = $event.target.files[0];
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('photo', this.image);
    const obj$ = this.userService.uploadData(formData);
    obj$.subscribe(data => {
      console.log(data);
      if (data.success) {
        this.condition = false;
        this.uploadButton = false;
        this.uploadForm.patchValue({
          document: data.url
        });
      }
    });
  }


  /////////////// Add multiple fields//////////////

  createItem(): FormGroup {
    return this.formBuilder.group({
      topics: ''
    });
  }

  get items(): FormArray {
    return this.uploadForm.get('topic_covered') as FormArray;
  }

  addItem () {
    this.items.push(this.createItem());
  }


//////// Submit Form/////////////

  OnUpload (submitForm: any ) {
    console.log(submitForm);
    const obs$ = this.userService.formSubmit(submitForm);
    obs$.subscribe(data => {
      if (data.success) {
        this.condition = true;
        this.uploadButton = false;
        console.log(data);
        this.router.navigate(['uploads', 'information']);
      }
    });
  }
}
