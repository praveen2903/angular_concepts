import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-validations',
  standalone: false,
  templateUrl: './reactive-forms-validations.html',
  styleUrl: './reactive-forms-validations.css',
})
export class ReactiveFormsValidations implements OnInit {

  registrationForm!: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {}  //dependency injected 

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [ Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      age:    ['', [Validators.required, Validators.min(18)]],

      gender: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(8)]],

      skills: this.fb.array([this.fb.control('')])
    });

  }

  get f() {
    return this.registrationForm.controls;
  }

  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    //currently no backend so just console
    // this.servicesDemo.createUser(this.registrationForm.value).subscribe(response => {
    //     console.log('POST SUCCESS',response);
    //   });
    console.log(this.registrationForm.value);
    alert('Form Submitted');
  }

  formsTsCode = `  registrationForm!: FormGroup;

  submitted = false;
  constructor(private fb: FormBuilder) {}  //dependency injection 
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [ Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      age:    ['', [Validators.required, Validators.min(18)]],

      gender: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(8)]],

      skills: this.fb.array([this.fb.control('')])
    });

  }

  get f() {
    return this.registrationForm.controls;
  }

  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    //currently no backend so just console
    // this.servicesDemo.createUser(this.registrationForm.value).subscribe(response => {
    //     console.log('POST SUCCESS',response);
    //   });
    console.log(this.registrationForm.value);
    alert('Form Submitted');
  }`

  formshtmlcode = `<section class="card">

<form [formGroup]="registrationForm" (ngSubmit)="submitForm()">
<label>Full Name</label>

<input type="text" formControlName="fullName"/>
<div class="error" *ngIf="submitted && f['fullName'].errors">

<span *ngIf="f['fullName'].errors?.['required']">Name Required</span>
<span *ngIf="f['fullName'].errors?.['minlength']">Minimum 3 Characters</span>
</div>

<hr>

<!-- EMAIL -->

<label>Email</label>

<input type="email" formControlName="email">

<div class="error" *ngIf="submitted && f['email'].errors">
<span *ngIf="f['email'].errors?.['required']">Email Required</span>
<span *ngIf="f['email'].errors?.['email']">Invalid Email</span>
</div>

<hr>

<!-- MOBILE -->

<label>Mobile</label>
<input formControlName="mobile"/>
<div class="error" *ngIf="submitted && f['mobile'].errors">Invalid Mobile Number</div>
<hr>

<!-- AGE -->

<label>Age</label>
<input type="number" formControlName="age"/>
<div class="error" *ngIf="submitted &&  f['age'].errors">Must Be 18+</div>
<hr>

<!-- GENDER -->
<label>Gender</label>
<select formControlName="gender">
    <option value="">Select</option>
    <option>Male</option>
    <option>Female</option>
</select>
<div class="error" *ngIf="submitted && f['gender'].errors">Select Gender</div>
<hr>

<!-- PASSWORD -->

<label>Password</label>
<input type="password" formControlName="password"/>
<div class="error" *ngIf="submitted && f['password'].errors">Minimum 8 Characters</div>
<hr>

<!-- FORM ARRAY -->
<h3>Skills</h3>
<div formArrayName="skills">
    <div *ngFor="let skill of skills.controls;
                    let i=index" style="display: flex; gap: 20px;">
        <input [type]="'text'" [formControlName]="i"/>
        <button type="button" (click)="removeSkill(i)">Remove </button>
    </div>
</div>
<button type="button" (click)="addSkill()">Add Skill</button>
<hr>
<button type="submit">Register</button>
</form>
</section>`
}
