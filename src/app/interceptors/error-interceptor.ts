import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackBar.open(err.error.error, 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        return throwError(err.error.error);
      })
    );
  }
}
