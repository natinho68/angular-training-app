import {
  Component, Input, AfterContentInit, OnDestroy, ContentChildren,
  QueryList, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { first, filter } from 'rxjs/operators';

import { SlideComponent } from './slide/slide.component';

// TODO: Modify ChangeDetection to OnPush
@Component({
  selector: 'cinemapp-slideshow',
  template: `
    <div id="slideshow">
      <div id="slides" (swipe)="onSwipe($event)" [style.transform]="transform"
      [style.transitionDuration.ms]="speed" (transitionend)="onTransitionEnd()">
        <ng-content></ng-content>
      </div>
      <div id="pagination">
        <cinemapp-pagination [current]="current" [total]="total" (pagination)="onPagination($event)"></cinemapp-pagination>
      </div>
    </div>
  `,
  styleUrls: ['./slideshow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowComponent implements AfterContentInit, OnDestroy {

  /** Delay between each automatic move */
  @Input() delay = 5000;
  /** Speed for one move */
  @Input() speed = 1000;
  /** Slides list */
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;
  /** Total of slides */
  total = 0;
  /** Currently displayed slide */
  current = 1;
  /** Transform value to move the slide */
  transform = '';
  /** Reference to the current timer */
  private timer = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private appRef: ApplicationRef,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngAfterContentInit() {

    if (this.slides) {

      this.total = this.slides.length;

      this.appRef.isStable.pipe(
        first(),
        filter(() => isPlatformBrowser(this.platformId)),
      ).subscribe(() => {

        /* Launches a new timer and then move */
        this.timer = window.setTimeout(() => {

          this.move();

          this.changeDetector.detectChanges();

        }, this.delay);

      });

    }

  }

  ngOnDestroy() {

    this.stop();

  }

  /** Launches the automatic delay */
  start(): void {

    if (isPlatformBrowser(this.platformId)) {

      /* Stop any current timer to avoid concurrent timers */
      this.stop();

      /* Launches a new timer and then move */
      this.timer = window.setTimeout(() => {

        this.move();

        // TODO: Activate the change detection manually
        this.changeDetector.markForCheck();

      }, this.delay);

    }

  }

  /** Stops the current timeout */
  stop(): void {

    if (isPlatformBrowser(this.platformId)) {

      window.clearTimeout(this.timer);

    }

  }

  /**
   * Move to another slide
   * @param next Position of the destination slide
   */
  move(next = this.getNextPosition()): void {

    /* Translate the slides container */
    this.transform = `translateX(${(1 - next) * 100}%)`;

    /* Update the new current position */
    this.current = next;

    /* The transitionend event (registered in constructor) will relaunch a new timer */

  }

  /** Transition listener handler */
  onTransitionEnd(): void {

    /* Relaunch a new timer */
    this.start();

  }

  /** Pagination listener handler */
  onPagination(page: number): void {

    /* Stop the automatic delay as the user interacts */
    this.stop();

    /* Move to the wanted slide */
    this.move(page);

  }

  onSwipe(event: PointerEventInput): void {

    switch (event.direction) {

      case Hammer.DIRECTION_RIGHT:
        if (this.current > 1) {
          this.stop();
          this.move(this.current - 1);
        }
        break;

      case Hammer.DIRECTION_LEFT:
        if (this.current <= this.total) {
          this.stop();
          this.move();
        }
        break;

    }

  }

  /**
   * Calculate next position
   * @returns Next position
   */
  private getNextPosition(): number {

    return (this.current < this.total) ? (this.current + 1) : 1;

  }

}
