import {Injectable} from '@angular/core';
import {Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Observable} from "rxjs/Observable";

import {items} from './data/items';

@Injectable()
export class DataService {
    delay: number = 2000;
    constructor(private http: Http,
                private backend: MockBackend) {
        this.backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url.includes('/items')) {
                let { start, end } = JSON.parse(connection.request.getBody());
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            items: items.slice(start, end),
                            last: items.length
                        }
                    })));
                }, this.delay);
            }
        });
    }

    public getGridData(params): Observable<Response> {
        return this.http.post('/items', params, {});
    }
}