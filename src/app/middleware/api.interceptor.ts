import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  
  const token = localStorage.getItem('token')

  // console.log('Token from localStorage:', token);
  // console.log('Outgoing HTTP request', req);

  const reqClone = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`
    }
  });
  return next(reqClone);

};
