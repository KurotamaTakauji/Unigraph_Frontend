import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { TemplatesComponent } from './templates/templates.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialCollectionModule} from "./material.module";
import { EditorComponent } from './editor/editor.component';
import { AppTemplatePopupComponent } from './app-template-popup/app-template-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    TemplatesComponent,
    UserPageComponent,
    EditorComponent,
    AppTemplatePopupComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialCollectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
