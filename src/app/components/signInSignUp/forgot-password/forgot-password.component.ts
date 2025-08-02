import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {map, pipe} from 'rxjs';
import {UPatternDirective} from '../../../../shared/directives/u-pattern.directive';
import {AuthService} from '../../../services/auth.service';
import {Patterns} from '../../../../shared/constants/patterns';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  imports: [
    CommonModule,
    TranslatePipe,
    RouterLink,
    ReactiveFormsModule,
    UPatternDirective
  ],
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]]
    },{updateOn: "blur"});
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.forgotPassword(this.forgotForm.get('email')?.value).pipe(
          map(res=>{
            this.isLoading = false;
            if (res?.success) {
              this.isSubmitted = true;
            } else {
              this.errorMessage = res?.message || 'FAILED_TO_SEND_RESET_EMAIL';
            }
          })
      ).subscribe();
    }
  }

  resendEmail(): void {
    this.isSubmitted = false;
    this.onSubmit();
  }
}
