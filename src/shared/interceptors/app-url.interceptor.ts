import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../enviroments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let baseUrl: string = environment.NG_APP_API_HOST;
  if (req.url.includes('i18')){
    baseUrl = '';
  }

  req = req.clone({
    url: `${baseUrl}${req.url}`,
  });
  return next(req);
};
