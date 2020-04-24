import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, HostListener } from '@angular/core';
import {ConfigService} from 'src/app/services/config.service';
import {NavigationService} from 'src/app/services/navigation.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-songs-player',
  templateUrl: './songs-player.component.html',
  styleUrls: ['./songs-player.component.css']
})
export class SongsPlayerComponent implements OnInit, AfterViewInit {

  @ViewChildren('allthis') list: QueryList<any>;
  public id: string;
  public audio: any;
  public source: string;
  public bird: string;

  constructor(
    private configService: ConfigService,
    private navigationService: NavigationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.configService.getJSON('http://94.23.199.177/nr:'+this.id)
        .subscribe( data => {
          this.audio = data['recordings'][0];
          this.source = 'https:'+this.audio.file;
          this.bird = this.audio.en.replace(' ', '%20');
        });
    });
  }

  ngAfterViewInit(): void {
    this.list.changes.subscribe( t => {
      this.navigationService.init();
    })
  }

  @HostListener('document:keydown.softright')
  OnSoftRight() {
    this.navigationService.GoToSongsList(this.bird)
  }

  @HostListener('document:keydown.softleft')
  OnSoftLeft() {
    this.navigationService.GoToHome()
  }

}
