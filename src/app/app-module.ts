import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { BasicAngularConcepts } from './components/basic-angular-concepts/basic-angular-concepts';
import { FormsModule } from '@angular/forms';
import { StructuralDirectives } from './components/structural-directives/structural-directives';

@NgModule({
  declarations: [App, BasicAngularConcepts, StructuralDirectives],
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
