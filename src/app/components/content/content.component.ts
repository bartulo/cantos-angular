import { Component, HostListener, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {

  @ViewChildren('allthis') list: QueryList<any>;
  public listObservable: any;
  public birds: string[];
  public filtered: string[];
  public filter: string;
  public namesDict;

  constructor(private configService: ConfigService, private navigationService: NavigationService) {
    this.birds = [];
    this.filter = '';
  }

  ngOnInit(): void {

    this.configService.getJSON('assets/names.json')
    .subscribe( data => {
      this.namesDict = data;

      this.birds = Object.keys(data).sort();
      this.filtered = this.birds;
    });

  }

  ngAfterViewInit(): void {
    this.listObservable = this.list.changes.subscribe( t => {
        this.navigationService.init();
    });
  }

  changeFilter() {
    var scope = this;
    function filterItems(query: string) {
      return scope.birds.filter( el =>{
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    this.filtered = filterItems(this.filter);
  }

  @HostListener('document:keydown.enter')
  OnEnter() {
    const current = this.navigationService.getCurrentItem()[0];
    if (current.nodeName == 'SPAN') {
      const bird = current.innerHTML;
      console.log(this.namesDict[bird]);
      const birdName = this.namesDict[bird].replace(' ', '%20');
      this.navigationService.GoToSongsList(birdName);
    } else {
      this.navigationService.Down();
    }
  }

  @HostListener('document:keydown.softright')
  OnSoftRight() {
    const current = this.navigationService.getCurrentItem()[0];
    if (current.nodeName == 'SPAN') {
      this.listObservable.unsubscribe();
      this.navigationService.GoToSearch();
    } else {
      this.filter = '';
    }
  }

}
