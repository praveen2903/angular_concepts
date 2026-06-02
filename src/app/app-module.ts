import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { BasicAngularConcepts } from './components/basic-angular-concepts/basic-angular-concepts';
import { FormsModule } from '@angular/forms';
import { StructuralDirectives } from './components/structural-directives/structural-directives';
import { PipesRouting } from './components/pipes-routing/pipes-routing';
import { SalaryPipe } from './pipes/salary-pipe';
import { SearchFilterPipe } from './pipes/search-filter-pipe';
import { HighlightSearchPipe } from './pipes/highlight-search-pipe';
import { LifecycleInputoutput } from './components/lifecycle-inputoutput/lifecycle-inputoutput';
import { ServicesTemplateref } from './components/services-templateref/services-templateref';

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
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
