import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-softkey',
  templateUrl: './softkey.component.html',
  styleUrls: ['./softkey.component.css']
})
export class SoftkeyComponent {

  @Input() right: string;
  @Input() center: string;
  @Input() left: string;

  constructor() {
  }
}
