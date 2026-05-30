import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicAngularConcepts } from './components/basic-angular-concepts/basic-angular-concepts';
import { StructuralDirectives } from './components/structural-directives/structural-directives';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full'
  },
  {
    path: 'basic',
    component: BasicAngularConcepts
  },
  {
    path: 'structural',
    component: StructuralDirectives
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}