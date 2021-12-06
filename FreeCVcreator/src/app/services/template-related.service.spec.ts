import { TestBed } from '@angular/core/testing';

import { TemplateRelatedService } from './template-related.service';

describe('TemplateRelatedService', () => {
  let service: TemplateRelatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateRelatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
