import { Component, OnInit } from '@angular/core';
import {ConfigService} from 'src/app/services/config.service';
import {NavigationService} from 'src/app/services/navigation.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-songs-player',
  templateUrl: './songs-player.component.html',
  styleUrls: ['./songs-player.component.css']
})
export class SongsPlayerComponent implements OnInit {

  public id: string;
  public audio: any;
  public source: string;

  constructor(
    private configService: ConfigService,
    private navigationService: NavigationService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('hola');
    this._route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.configService.getJSON('http://94.23.199.177/nr:'+this.id)
        .subscribe( data => {
          this.audio = data['recordings'][0];
          this.source = 'https:'+this.audio.file;
        });
    });
  }

}
