import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { TemplatesComponent } from './templates/templates.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import {UserPageComponent} from "./user-page/user-page.component";
import {EditorComponent} from "./editor/editor.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ':uniN/:uniID/:facultyN/:facultyID/:majorN/:majorID', component: TemplatesComponent },
  { path: 'edit/:templateID', component: EditTemplateComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
