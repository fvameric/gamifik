import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'services/token.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private token: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.token.getToken();
        let httpReq = req;
        if (token != null) {
            httpReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer' + token)
            });
            
        }
        return next.handle(httpReq);
    }
}