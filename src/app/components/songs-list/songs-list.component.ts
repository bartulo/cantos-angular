import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  public songs: any[];
  public bird: string;

  constructor(
    private configService: ConfigService, 
    private navigationService: NavigationService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.bird = params.bird;
      this.configService.getJSON('http://94.23.199.177/'+this.bird)
      .subscribe( data => {
        this.songs = data['recordings'];
      });
    });
  }

  @HostListener('document:keydown.enter')
  OnEnter() {
    const current = this.navigationService.getCurrentItem()[0];
    const id = parseInt(current.getAttribute('id'), 10);
    console.log(id);
    this.navigationService.GoToAudioPlayer(id);
  }

}
