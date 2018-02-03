import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { AppComponent } from './app.component';
import {BackendService} from './backend.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MyDateRangePickerModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
