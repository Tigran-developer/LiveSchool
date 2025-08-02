import {AbstractControl} from '@angular/forms';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.value && confirmPassword?.value) {
    if(password?.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }
  return null;
}

export {passwordMatchValidator}
