import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTemplateComponent } from './current-template.component';

describe('CurrentTemplateComponent', () => {
  let component: CurrentTemplateComponent;
  let fixture: ComponentFixture<CurrentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
