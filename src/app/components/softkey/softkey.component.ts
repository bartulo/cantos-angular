import { Component, OnInit } from '@angular/core';

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
export class SoftkeyComponent implements OnInit {
  private inputSoftkey: Softkey = { left: '', center:'Enter', right: '' };
  private todoSoftkey: Softkey = { left: '', center:'Enter', right: '' };
  public softkey: Softkey = this.inputSoftkey;

  constructor() { }

  ngOnInit(): void {
  }

}
