import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {UserServiceService} from '../services/user-service.service';
import {Observable} from 'rxjs';
import {FileUploader} from 'ng2-file-upload';

function readBase64(file): Promise<any> {
  const reader  = new FileReader();
  const future = new Promise((resolve, reject) => {
    reader.addEventListener('load', function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener('error', function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
  return future;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  filename = 'Select File';

  result: any = [];

  public search: any;

  public uploader: FileUploader = new FileUploader({});

  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) {
  }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      types          : ['notes', Validators.required],
      branch         : ['cs', Validators.required],
      course         : ['B-Tech', Validators.required],
      university     : ['Abdul kalam azaad technical university', Validators.required],
      doc_of_college : ['krishna institute of engineering and technology', Validators.required],
      document       : [null, Validators.required],
      semester       : ['3', Validators.required],
      subject        : [null, Validators.required],
      topic_covered  : this.formBuilder.array([this.createItem()])
    });

    this.search = (text$: Observable<string>) => text$.pipe(
      // debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.result.filter(v => {
          console.log('v ', v);
          return v;
        }).slice(0, 10))
    );
  }


  //////////// File Converted into base64/////////////////

  onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];

    const formData = new FormData();
    formData.append('file', file);
    const r = new XMLHttpRequest();
    r.open('POST', '/user/upload');
    r.send(formData);

    // this.uploadForm.patchValue({
    //   document: file
    // });

    // readBase64(file)
    //   .then(data => {
    //     // const formData = new FormData();
    //     // formData.append('image', data);
    //     // const r = new XMLHttpRequest();
    //     // r.open('POST', '/user/upload');
    //     // r.send(formData);
    //     this.uploadForm.patchValue({
    //       document: data
    //     });
    //   });

  }

  // onFileChange(event) {
  //   // const reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     const file = event.target.files[0];
  //     // reader.readAsDataURL(file);
  //     // this.filename = file.name;
  //     // reader.onload = () => {
  //     //   console.log(reader.result);
  //       this.uploadForm.patchValue({
  //         document: file
  //         // document: file
  //       });
  //     // };
  //   }
  // }

  // onFileChange(event) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
  //     this.filename = file.name;
  //     reader.onload = () => {
  //       console.log(reader.result);
  //       this.uploadForm.patchValue({
  //         document: reader.result
  //         // document: file
  //       });
  //     };
  //   }
  // }

  /////////////// Add multiple fields

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


  ////  Searched value //////////////

  valueUpdate($event) {
    if ($event.length > 3) {
      const obs$ = this.userService.branchData($event);
      obs$.subscribe(value => {
        this.result = value.value;
      });
    }
  }

//////// Submit Form/////////////

  OnUpload (uploadForm: any ) {
    // const fd = new FormData();
    // fd.append('branch', uploadForm.branch);
    // fd.append('semester', uploadForm.semester);
    // fd.append('document', uploadForm.document);

    console.log(uploadForm);
    const obs$ = this.userService.uploadData(uploadForm);
    obs$.subscribe(data => {
      console.log(data);
    });
  }
}
