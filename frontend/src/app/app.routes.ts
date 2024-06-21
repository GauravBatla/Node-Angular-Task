import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { protectGuard } from './core/guards/protect.guard';
import { ProductListComponent } from './components/features/product-list/product-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'login',
        canActivate: [protectGuard],
        component: LoginComponent
    },
    {
        path: '',
        loadComponent: () => import('../app/layout/contnent-layout/contnent-layout.component').then((x) => x.ContnentLayoutComponent),
        canActivate:[authGuard],
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'product/list',
                component:ProductListComponent
            }
        ]
    }
];
