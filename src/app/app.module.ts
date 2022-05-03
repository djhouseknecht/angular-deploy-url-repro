import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HammerComponent } from './hammer/hammer.component';
import { BifrostComponent } from './bifrost/bifrost.component';


const routes: Routes = [
  {
    path: 'hammer',
    component: HammerComponent
  },
  {
    path: 'bifrost',
    component: BifrostComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HammerComponent,
    BifrostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
      // enableTracing: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
