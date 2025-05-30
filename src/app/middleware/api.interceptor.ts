import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token')

  const reqClone = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`
    }
  });
  return next(reqClone);
};
