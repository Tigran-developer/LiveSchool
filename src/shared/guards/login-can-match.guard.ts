import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../app/services/auth.service';
import {ApiPath} from '../constants/api-path';

export const loginCanMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.currentUser) return true;
  if (authService?.currentUser && !authService?.currentUser?.roles.includes('Pupil')) {
    router.navigate([ApiPath.student+ApiPath.booked_classes]);
    return false
  }
  return false;
};
