import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../app/services/auth.service';

export const loginCanMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.currentUser) return true;
  if (authService?.currentUser && !authService?.currentUser?.isTeacher) {
    router.navigate(['pupil/booked-classes']);
    return false
  }
  return false;
};
