import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from './movie';
import { Theater } from './theater';
import { Schedule } from './schedule';
import { Slide } from './slide';
import { Slide as SlideshowSlide } from '../../ui/slideshow';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {

    return this.http.get<Movie[]>(`/api/cinema/movies`);

  }

  getMovie(id: number): Observable<Movie> {

    return this.http.get<Movie>(`/api/cinema/movie/${id}`).pipe(map(this.groupSchedules('theater')));

  }

  getTheaters(): Observable<Theater[]> {

    return this.http.get<Theater[]>(`/api/cinema/theaters`);

  }

  getTheater(id: number): Observable<Theater> {

    return this.http.get<Theater>(`/api/cinema/theater/${id}`).pipe(map(this.groupSchedules('movie')));

  }

  getSlides(): Observable<SlideshowSlide[]> {

    return this.http.get<Slide[]>(`/api/cinema/slides`).pipe(map((slides) =>
      slides.map((slide) => ({ ...slide, link: `../movie/${slide.movieId}` }))
    ));

  }

  private groupSchedules(groupBy: 'theater'): (movie: Movie) => Movie;
  private groupSchedules(groupBy: 'movie'): (theater: Theater) => Theater;
  private groupSchedules<T extends Movie | Theater>(groupBy: 'movie' | 'theater'): (movieOrTheater: T) => T {

    return (movieOrTheater: T) => {

      const rawSchedules = movieOrTheater.schedules || [];

      const schedulesGroups = Array.from(new Set<number>(rawSchedules
        .map((schedule) => schedule[groupBy].id)))
        .map((id) => rawSchedules.filter((schedule) => schedule[groupBy].id === id));

      return Object.assign({}, movieOrTheater, { schedulesGroups });

    };

  }

}
