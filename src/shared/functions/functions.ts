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
function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString() + ' ' +
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export {passwordMatchValidator, formatDateTime}
