import { environment } from './../../../environments/environment';
// tslint:disable:ban-types
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  endpoint = `${environment.apiUrl}/validate`;
  constructor(
    private http: Http
  ) {}

  public validateCode(code: String) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post(this.endpoint, { code }, options)
      .pipe(
        map((response: any) => response.json())
      );
  }
}
