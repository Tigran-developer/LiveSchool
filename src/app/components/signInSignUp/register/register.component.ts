import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {URequiredDirective} from '../../../../shared/directives/u-required.directive';
import {UPatternDirective} from '../../../../shared/directives/u-pattern.directive';
import {AuthService} from '../../../services/auth.service';
import {Patterns} from '../../../../shared/constants/patterns';
import {passwordMatchValidator} from '../../../../shared/functions/functions';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    RouterLink,
    URequiredDirective,
    UPatternDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
      phone: ['', [Validators.required, Validators.pattern(Patterns.phone)]],
      isTeacher: [false],
      password: ['', [Validators.required, Validators.pattern(Patterns.password)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator, updateOn: "blur"});
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.message || 'Registration failed';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred. Please try again.';
        }
      });
    }
  }
}
