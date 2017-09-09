import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

// TODO Consider packaging components here so they don't need to be relisted in app.ts

const appRoutes: Routes = [/*
    {
        path: 'dashboard',
        component: BasicDashboardComponent,
        children: [
            { path: '', component: DashboardCardsComponent }
        ]
    },

    { path: 'placeholder',    component: PlaceholderComponent },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: RouteNotFoundComponent }*/
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
