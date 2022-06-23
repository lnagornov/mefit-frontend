import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig: any = {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods" : "*",
      "Access-Control-Max-Age" : "3600",
      "Access-Control-Allow-Credentials" : "true",
      "Access-Control-Allow-Headers" : "Content-Type",
    };
    const request = req.clone({setHeaders: headersConfig});

    return next.handle(request);
  }
}
