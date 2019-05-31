import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AddonCommonsModule} from '../../../shared-addon/src/app/addon-commons/addon-commons.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AddonCommonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
