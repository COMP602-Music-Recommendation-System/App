import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(private http: HttpClient, private router: Router) {}

  get<T>(url: string) {
    return this.http.get<T>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 || error.status == 422) {
          localStorage.setItem('next', '/' + location.hash);
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
