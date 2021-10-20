import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';


const routes: Routes = [
  { path: 'form-better', component: ReactiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'form-better' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
