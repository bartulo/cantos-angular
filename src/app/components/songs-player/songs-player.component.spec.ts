import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsPlayerComponent } from './songs-player.component';

describe('SongsPlayerComponent', () => {
  let component: SongsPlayerComponent;
  let fixture: ComponentFixture<SongsPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
