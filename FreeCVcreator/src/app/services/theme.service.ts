import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private dark = false;

  load(): void {
    const saved = localStorage.getItem('darkMode');
    this.dark = saved === 'true';
    this.apply();
  }

  toggle(): void {
    this.dark = !this.dark;
    localStorage.setItem('darkMode', this.dark.toString());
    this.apply();
  }

  isDark(): boolean {
    return this.dark;
  }

  private apply(): void {
    if (this.dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
