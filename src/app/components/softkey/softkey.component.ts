import { Component, Input, AfterViewChecked } from '@angular/core';
import {NavigationService} from 'src/app/services/navigation.service';

@Component({
  selector: 'app-softkey',
  templateUrl: './softkey.component.html',
  styleUrls: ['./softkey.component.css']
})
export class SoftkeyComponent implements AfterViewChecked{

  @Input() right: string;
  @Input() center: string;
  @Input() left: string;
  public nodeName: string;

  constructor(private navigationService: NavigationService) {
    this.nodeName = 'SPAN'
  }

  ngAfterViewChecked() {
    this.navigationService.currentItem.subscribe(current => {
      if (current.nodeName != this.nodeName) {
        if (current.nodeName == 'INPUT') {
          this.left = 'Buscar';
          this.center = 'Volver';
          this.right = 'Borrar';
          this.nodeName = 'INPUT';
        } else {
          this.left = '';
          this.center = 'Enter';
          this.right = 'Buscar';
          this.nodeName = 'SPAN';
        }
      }
    })
  }
}
