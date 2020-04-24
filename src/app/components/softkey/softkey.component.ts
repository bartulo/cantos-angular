import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {NavigationService} from 'src/app/services/navigation.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

interface Softkey {
  left: string;
  center: string;
  right: string;
}

@Component({
  selector: 'app-softkey',
  templateUrl: './softkey.component.html',
  styleUrls: ['./softkey.component.css']
})
export class SoftkeyComponent implements OnInit, AfterViewChecked{
  private homeSoftkey: Softkey = { left: '', center:'Enter', right: 'Buscar' };
  private searchSoftkey: Softkey = { left: '', center:'Volver', right: 'Limpiar' };
  private songsSoftkey: Softkey = { left: 'Volver', center:'Enter', right: '' };
  private playerSoftkey: Softkey = { left: 'Inicio', center:'Pause', right: 'Volver' };
  public softkey: Softkey = this.homeSoftkey;
  public page: string;

  constructor(private navigationService: NavigationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => { 
      console.log(params);
    });
  }

  ngAfterViewChecked() {
    this.toHearChangesNavigation();
  }

  private toHearChangesNavigation(): void {
    this.navigationService.currentItem.subscribe(current =>{
      this.page = this.router.url.split('/')[1];
      if (this.page == 'songsPlayer') {
        this.softkey = this.playerSoftkey;
      } else if (this.page == 'songsList') {
        this.softkey = this.songsSoftkey;
      } else {
        if (current.nodeName == 'INPUT') {
          this.softkey = this.searchSoftkey;
        } else {
          this.softkey = this.homeSoftkey;
        }
      }
    });
  }

}
