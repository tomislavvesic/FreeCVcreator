import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTwoComponent } from './template-two.component';

describe('TemplateTwoComponent', () => {
  let component: TemplateTwoComponent;
  let fixture: ComponentFixture<TemplateTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
