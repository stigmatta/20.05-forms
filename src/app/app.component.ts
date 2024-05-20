// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl,ReactiveFormsModule, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      agree: [false, Validators.required],
      hobbies: this.fb.array([])
    });
  }

  addHobby() {
    const control = this.fb.control('');
    this.hobbies.push(control);
  }

  get hobbies() {
    return this.myForm.get('hobbies') as FormArray;
  }

  setFormSubmitted() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.myForm.reset();
      const hobbiesArray = this.myForm.get('hobbies') as FormArray;
      while (hobbiesArray.length) {
        hobbiesArray.removeAt(0);
      }
  }
  
  
}
}
