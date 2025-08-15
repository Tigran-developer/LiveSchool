import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {catchError, filter, of, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Patterns} from '../../../../shared/constants/patterns';
import {URequiredDirective} from '../../../../shared/directives/u-required.directive';
import {UPatternDirective} from '../../../../shared/directives/u-pattern.directive';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    RouterLink,
    URequiredDirective,
    UPatternDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  submit$ = new Subject<void>();
  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
      password: ['', [Validators.required]]
    }, {updateOn: "blur"});
  }

  ngOnInit() {
    const email = this.activatedRoute.snapshot.queryParamMap.get('email');
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (email && token) {
      this.authService.confirmEmail(email, token).subscribe()
    }
    this.submitListener();
  }

  submitListener(): void {
    this.submit$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.loginForm.valid),
        tap(() => {
          this.isLoading = true;
          this.errorMessage = '';
        }),
        switchMap(() =>
          this.authService.login(this.loginForm.value).pipe(
            tap(response => {
              this.isLoading = false;
              if (response.success) {
                if(this.authService.currentUser?.isTeacher){
                  this.router.navigate(['/teacher']);
                }else {
                  this.router.navigate(['/pupil']);
                }
              } else {
                response.message
                this.errorMessage = response.message ?? 'LOGIN.ERROR.INVALID_CREDENTIALS';
                this.cdr.detectChanges();
              }
            })
          )
        )
      ).subscribe();
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
