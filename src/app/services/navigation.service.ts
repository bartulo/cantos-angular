import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // TODO intentar solucionar para que el método init sólo se utilice una vez y no tener que definir esta variable
  public valor: boolean;

  constructor(private _router: Router) { 
    this.valor = false;
  }

  public init() {
    console.log(this.valor);
    if (this.valor != true) {
      const firstElement = this.getAllElements()[0];
      firstElement.classList.add('focus');
      (firstElement as HTMLElement).focus();
      this.valor = true;
    }
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
    console.log(old.children[0].innerHTML);
    (old as HTMLElement).blur();
    old.classList.remove('focus');
    const last = this.getAllElements().length;
    const active = (index != last-1) ? this.getAllElements()[index+1] : this.getAllElements()[0];
    (active as HTMLElement).focus();
    active.classList.add('focus');
  }

  public Up() {
    const [old, index] = this.getCurrentItem();
    (old as HTMLElement).blur();
    old.classList.remove('focus');
    const last = this.getAllElements().length;
    const active = (index != 0) ? this.getAllElements()[index-1] : this.getAllElements()[last-1];
    (active as HTMLElement).focus();
    active.classList.add('focus');
  }

  public GoToSongsList(bird: string) {
    this.valor = false;
    this._router.navigate(['/songsList', bird]);
  }

  public GoToAudioPlayer(id: number) {
    this.valor = false;
    this._router.navigate(['/songsPlayer', id]);
  }

  public GoToSearch() {
    const old = this.getCurrentItem()[0];
    (old as HTMLElement).blur();
    old.classList.remove('focus');
    document.querySelector('input').focus();
  }

}
