import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicAngularConcepts } from './components/basic-angular-concepts/basic-angular-concepts';
import { StructuralDirectives } from './components/structural-directives/structural-directives';
import { PipesRouting } from './components/pipes-routing/pipes-routing';
import { LifecycleInputoutput } from './components/lifecycle-inputoutput/lifecycle-inputoutput';
import { ServicesTemplateref } from './components/services-templateref/services-templateref';
import { ReactiveFormsValidations } from './components/reactive-forms-validations/reactive-forms-validations';
import { ModelsUsage } from './components/models-usage/models-usage';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';
import { AngularInterview } from './components/angular-interview/angular-interview';

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
  },
  {
    path: 'services',
    component: ServicesTemplateref
  },
  {
    path:'forms',
    component: ReactiveFormsValidations
  }, 
  {
    path:'models',
    component: ModelsUsage
  }, {
    path: 'rxjs',
    component: RxjsDemo
  }, {
    path:'angular-interview',
    component: AngularInterview
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}