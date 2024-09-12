import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rt-slideshow',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="slideshow-container">
      <div *ngFor="let slide of slides; let i = index" [ngClass]="{'active': i === currentSlide, 'fade': true}" class="slide">
        <div [ngStyle]="{ 'background-image': 'url(' + slide.image + ')', 'height': slide.height }" class="slide-background">
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>

      <a class="prev" (click)="previousSlide()">&#10094;</a>
      <a class="next" (click)="nextSlide()">&#10095;</a>
      <div class="dots">
        <span *ngFor="let slide of slides; let i = index" [ngClass]="{'active': i === currentSlide}" (click)="goToSlide(i)"></span>
      </div>
    </div>
  `,
  styles: [
    `
    .slideshow-container {
      position: relative;
      max-width: 100%;
      margin: auto;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .slide {
      display: none;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    .slide.active {
      display: block;
      opacity: 1;
    }

    .slide-background {
      width: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .slide-content {
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: white;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
      background-color: rgba(0, 0, 0, 0.5);
      padding: 20px;
      border-radius: 10px;
      z-index: 2;
    }

    .prev, .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      padding: 16px;
      color: white;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      user-select: none;
      z-index: 3;
      background-color: rgba(0,0,0,0.3);
      border-radius: 50%;
    }

    .prev {
      left: 10px;
      transform: translateY(-50%);
    }

    .next {
      right: 10px;
      transform: translateY(-50%);
    }

    .prev:hover, .next:hover {
      background-color: rgba(0,0,0,0.6);
    }

    .dots {
      text-align: center;
      padding: 10px;
      position: absolute;
      width: 100%;
      bottom: 15px;
      z-index: 4;
    }

    .dots span {
      cursor: pointer;
      height: 15px;
      width: 15px;
      margin: 0 2px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.6s ease;
    }

    .dots .active {
      background-color: #717171;
    }
    `
  ]
})
export class SlideshowComponent {
  @Input() slides: Array<{ title: string, description: string, image: string, height: string }> = [];
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 3000; // Intervalo de tempo entre os slides

  currentSlide = 0;
  autoPlayTimer: any;

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
/**
 mySlides = [
    {
      title: 'Primeiro Slide',
      description: 'Descrição do primeiro slide.',
      image: './assets/img/education-student-png.jpg',
      height: '600px'
    }
  ];

  <rt-slideshow
  [slides]="mySlides"
  [autoPlay]="true"
  [autoPlayInterval]="5000">
</rt-slideshow>
 */
