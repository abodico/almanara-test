import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-right-panel',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css',
})
export class RightPanelComponent implements OnInit {
  showPassword = false;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http.post('endpoint', this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    }
  }
}
