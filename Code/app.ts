// Angular imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, SlicePipe } from '@angular/common';

// BASE
import { AppRoutingModule } from './Core/app-routing.module';
import { AppComponent } from './Core/App.component';

// Pipes

// APIs

// Services + Utilities

// Views




let appInjectorRef: Injector;
export const appInjector = (injector?: Injector): Injector => {
    if (injector) {
        appInjectorRef = injector;
    }

    return appInjectorRef;
};

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
    ],
    entryComponents: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        DatePipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(injector: Injector) {
        appInjector(injector);
    }
}

platformBrowserDynamic().bootstrapModule(AppModule);
