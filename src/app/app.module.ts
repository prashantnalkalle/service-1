import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { PostDashComponent } from './shared/component/post-dash/post-dash.component';
import { PostFormComponent } from './shared/component/post-form/post-form.component';
import { PostListComponent } from './shared/component/post-list/post-list.component';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PostDashComponent,
    PostFormComponent,
    PostListComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
