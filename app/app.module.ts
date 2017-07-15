import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
// ag-grid
import {AgGridModule} from "ag-grid-angular/main";
// application
import {AppComponent} from "./app.component";

import {HttpModule, BaseRequestOptions, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        AgGridModule.withComponents([])
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        Http,
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend, options) => { return new Http(backend, options); }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
