import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCarouselComponent } from './cv-carousel.component';

describe('CvCarouselComponent', () => {
  let component: CvCarouselComponent;
  let fixture: ComponentFixture<CvCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
