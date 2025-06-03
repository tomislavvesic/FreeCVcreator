import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateThreeComponent } from './template-three.component';

describe('TemplateThreeComponent', () => {
  let component: TemplateThreeComponent;
  let fixture: ComponentFixture<TemplateThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
