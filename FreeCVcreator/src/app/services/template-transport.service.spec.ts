import { TestBed } from '@angular/core/testing';

import { TemplateTransportService } from './template-transport.service';

describe('TemplateTransportService', () => {
  let service: TemplateTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
