import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { BasicAngularConcepts } from './components/basic-angular-concepts/basic-angular-concepts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StructuralDirectives } from './components/structural-directives/structural-directives';
import { PipesRouting } from './components/pipes-routing/pipes-routing';
import { SalaryPipe } from './pipes/salary-pipe';
import { SearchFilterPipe } from './pipes/search-filter-pipe';
import { HighlightSearchPipe } from './pipes/highlight-search-pipe';
import { LifecycleInputoutput } from './components/lifecycle-inputoutput/lifecycle-inputoutput';
import { ServicesTemplateref } from './components/services-templateref/services-templateref';
import { ReactiveFormsValidations } from './components/reactive-forms-validations/reactive-forms-validations';
import { ModelsUsage } from './components/models-usage/models-usage';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';
import { AngularInterview } from './components/angular-interview/angular-interview';
import { ReactInterview } from './components/react-interview/react-interview';
import { SearchAutocomplete } from './components/search-autocomplete/search-autocomplete';
import { MachineCode } from './components/machine-code/machine-code';
import { AsyncMachineCodes } from './components/async-machine-codes/async-machine-codes';
import { NodeJs } from './components/node-js/node-js';
import { PgsqlDemo } from './components/pgsql-demo/pgsql-demo';
import { PgsqlQueries } from './components/pgsql-queries/pgsql-queries';

@NgModule({
  declarations: [
    App,
    BasicAngularConcepts,
    StructuralDirectives,
    PipesRouting,
    SalaryPipe,
    SearchFilterPipe,
    HighlightSearchPipe,
    LifecycleInputoutput,
    ServicesTemplateref,
    ReactiveFormsValidations,
    ModelsUsage,
    RxjsDemo,
    AngularInterview,
    ReactInterview,
    SearchAutocomplete,
    MachineCode,
    AsyncMachineCodes,
    NodeJs,
    PgsqlDemo,
    PgsqlQueries,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
