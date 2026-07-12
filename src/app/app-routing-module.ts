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
import { ReactInterview } from './components/react-interview/react-interview';
import { MachineCode } from './components/machine-code/machine-code';
import { AsyncMachineCodes } from './components/async-machine-codes/async-machine-codes';
import { NodeJs } from './components/node-js/node-js';
import { PgsqlDemo } from './components/pgsql-demo/pgsql-demo';
import { PgsqlQueries } from './components/pgsql-queries/pgsql-queries';
import { ProceduresDemo } from './components/procedures-demo/procedures-demo';
import { MongodbDemo } from './components/mongodb-demo/mongodb-demo';
import { ParentMachinecodes } from './components/parent-machinecodes/parent-machinecodes';

const routes: Routes = [
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
  }, {
    path: 'react-interview',
    component: ReactInterview
  }, {
    path: 'machine-code',
    component: MachineCode
  },
  {
    path:'async-machine-codes',
    component: AsyncMachineCodes
  },
  {
    path:'lifeCycle-ref-machine-codes',
    component: ParentMachinecodes
  },
  {
    path:'node-js',
    component: NodeJs
  }, 
  {
    path:'pgsql',
    component:PgsqlDemo
  },
  {
    path:'queries',
    component: PgsqlQueries
  },
  {
    path:'procedures',
    component:ProceduresDemo
  },
  {
    path:'mongodb',
    component:MongodbDemo
  },
  {
    path: '**',
    redirectTo: 'basic',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}