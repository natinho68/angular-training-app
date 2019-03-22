import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MoviesItemComponent } from './movies-item.component';
import { Movie } from '../../shared/movie';

describe('MovieItemComponent', () => {
  let component: MoviesItemComponent;
  let fixture: ComponentFixture<MoviesItemComponent>;
  let debugElement: DebugElement;
  const movie: Movie = {
    category: '',
    categoryId: 1,
    id: 1,
    imgSrc: '',
    releasedDate: '',
    schedules: [],
    schedulesGroups: [],
    summary: '',
    title: 'cc',
    videoSrc: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesItemComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = debugElement.query(By.css('mat-card-title')).nativeElement as HTMLElement;
    expect(title.textContent).toContain(movie.title);
    expect(component).toBeTruthy();
  });

});
