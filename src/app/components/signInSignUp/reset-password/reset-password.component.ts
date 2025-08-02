import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {passwordMatchValidator} from '../../../../shared/functions/functions';
import {AuthService} from '../../../services/auth.service';
import {Patterns} from '../../../../shared/constants/patterns';
import {UPatternDirective} from '../../../../shared/directives/u-pattern.directive';
import {URequiredDirective} from '../../../../shared/directives/u-required.directive';

@Component({
  selector: 'app-new-password',
  imports: [
    ReactiveFormsModule,
    NgIf,
    TranslatePipe,
    UPatternDirective,
    URequiredDirective,
  ],
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(Patterns.password)]],
      confirmPassword: ['', [Validators.required]]
    },{ validators: passwordMatchValidator, updateOn: "blur"});
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const email = this.activatedRoute.snapshot.queryParamMap.get('email') || undefined;
      const token = this.activatedRoute.snapshot.queryParamMap.get('token') || undefined;
      const password = this.resetForm.get('password')?.value || undefined;
      const confirmPassword = this.resetForm.get('confirmPassword')?.value || undefined;
      this.authService.resetPassword(email, token, password, confirmPassword).pipe(
        map(res=>{
          this.isLoading = false;
          if (res?.success) {
            this.isSubmitted = true;
            setTimeout(()=>{this.router.navigate(['login'])}, 700)
          } else {
            this.errorMessage = res?.message || 'FAILED_TO_RESET_PASSWORD';
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
