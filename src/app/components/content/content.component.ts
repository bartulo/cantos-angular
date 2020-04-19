import { Component, HostListener, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public birds: string[];
  public filtered: string[];
  public prueba: string;
  public namesDict;

  constructor(private configService: ConfigService, private navigationService: NavigationService) {
    this.birds = [];
    this.prueba = 'probando';
  }

  ngOnInit(): void {

    this.configService.getJSON('assets/names.json')
    .subscribe( data => {
      this.namesDict = data;

      this.birds = Object.keys(data).sort();
      this.filtered = this.birds;
    });

  }

  changeFilter() {
    var scope = this;
    function filterItems(query: string) {
      return scope.birds.filter( el =>{
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }
    this.filtered = filterItems(this.prueba);
  }

  @HostListener('document:keydown.enter')
  OnEnter() {
    const current = this.navigationService.getCurrentItem()[0];
    const bird = current.children[0].innerHTML;
    const birdName = this.namesDict[bird].replace(' ', '%20');
    this.navigationService.GoToSongsList(birdName);
  }

}
