import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CommonFormComponent } from './core/common-form/common-form.component';
import { ServicesComponent } from './core/services/services.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home/:sectionId', component: HomeComponent },
  { path: 'about/:sectionId', component: HomeComponent },
  { path: 'services/:sectionId', component: HomeComponent },
  { path: 'services/services/:id', component: ServicesComponent },
  { path: 'industries/:sectionId', component: HomeComponent },
  { path: 'contact', component: CommonFormComponent },
  { path: '**', redirectTo: '' },
];
