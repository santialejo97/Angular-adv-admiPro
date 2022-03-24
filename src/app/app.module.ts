import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NopagesfoundComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
