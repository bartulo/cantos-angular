import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './components/content/content.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongsPlayerComponent } from './components/songs-player/songs-player.component';

const appRoutes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'songsList/:bird', component: SongsListComponent },
  { path: 'songsPlayer/:id', component: SongsPlayerComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
