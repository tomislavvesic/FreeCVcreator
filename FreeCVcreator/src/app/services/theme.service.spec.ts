import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    service['dark'] = false;
    document.body.classList.remove('dark-mode');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    service.toggle();
    expect(service.isDark()).toBeTrue();
    expect(document.body.classList).toContain('dark-mode');
  });
});
