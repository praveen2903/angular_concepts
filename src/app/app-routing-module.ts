import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicAngularConcepts } from './components/basic-angular-concepts/basic-angular-concepts';
import { StructuralDirectives } from './components/structural-directives/structural-directives';
import { PipesRouting } from './components/pipes-routing/pipes-routing';
import { LifecycleInputoutput } from './components/lifecycle-inputoutput/lifecycle-inputoutput';

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
  },
  {
    path:'pipesandrouting',
    component: PipesRouting
  }, 
  {
    path:'lifecycle',
    component:LifecycleInputoutput
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}