import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public currentItem: Subject<Element> = new Subject<Element>();

  constructor(private _router: Router) {
  }

  public init() {
    const firstElement = this.getAllElements()[0];
    firstElement.classList.add('focus');
    (firstElement as HTMLElement).focus();
  }

  public getAllElements(): NodeListOf<HTMLInputElement | Element> {
    return document.querySelectorAll('.list-item');
  }

  public getCurrentItem(): [HTMLInputElement | Element, number] {
    const current = document.activeElement;
    const index = parseInt(current.getAttribute('tabindex'), 10);
    return [current, index];
  }

  public Down() {
    const [old, index] = this.getCurrentItem();
    (old as HTMLElement).blur();
    old.classList.remove('focus');
    const last = this.getAllElements().length;
    const active = (index != last-1) ? this.getAllElements()[index+1] : this.getAllElements()[0];
    (active as HTMLElement).focus();
    active.classList.add('focus');
    this.currentItem.next(active);
  }

  public Up() {
    const [old, index] = this.getCurrentItem();
    (old as HTMLElement).blur();
    old.classList.remove('focus');
    const last = this.getAllElements().length;
    const active = (index > 0 ) ? this.getAllElements()[index-1] : this.getAllElements()[last-1];
    (active as HTMLElement).focus();
    active.classList.add('focus');
    this.currentItem.next(active);
  }

  public GoToSongsList(bird: string) {
    this._router.navigate(['/songsList', bird]);
  }

  public GoToAudioPlayer(id: number) {
    this._router.navigate(['/songsPlayer', id]);
  }

  public GoToHome() {
    this._router.navigate(['/']);
  }

  public GoToSearch() {
    const old = this.getCurrentItem()[0];
    (old as HTMLElement).blur();
    old.classList.remove('focus');
    var inputElem = document.querySelector('input');
    console.log(inputElem.style.display);
    inputElem.style.display = 'block';
    inputElem.focus();
    this.currentItem.next(inputElem);
  }

}
