import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SoftkeyComponent } from './components/softkey/softkey.component';
import { ContentComponent } from './components/content/content.component';
import {ConfigService} from './services/config.service';
import { AppRoutingModule } from './app-routing.module';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongsPlayerComponent } from './components/songs-player/songs-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SoftkeyComponent,
    ContentComponent,
    SongsListComponent,
    SongsPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
