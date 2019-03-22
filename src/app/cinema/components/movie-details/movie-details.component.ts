import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Movie } from '../../shared/movie';

@Component({
  selector: 'cinemapp-movie-details',
  template: `
    <article>
      <mat-card>
        <iframe [src]="videoSrc" mat-card-image></iframe>
        <mat-card-title>{{movie.title}}</mat-card-title>
        <mat-card-content>{{movie.summary}}</mat-card-content>
      </mat-card>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {

  @Input() movie: Readonly<Movie>;

  get videoSrc(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.videoSrc);
  }

  constructor(private sanitizer: DomSanitizer) { }

}
