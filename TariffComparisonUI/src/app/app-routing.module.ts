import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';

const routes: Routes = [
  {
    path:'calculation',
    component: CalculationComponent
  },
  {
    path:'**',
    redirectTo: 'calculation'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
