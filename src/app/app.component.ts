import { Component, HostListener, OnInit, AfterViewChecked } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'cantos-angular';

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {}

  ngAfterViewChecked(){
    this.navigationService.init()
  }

  @HostListener('document:keydown.arrowdown')
  OnArrowDown() {
    this.navigationService.Down();
  }

  @HostListener('document:keydown.arrowup')
  OnArrowUp() {
    this.navigationService.Up();
  }
}
