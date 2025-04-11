import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  standalone: false
})
export class AppComponent {
  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.setTheme(prefersDark.matches);

    prefersDark.addEventListener('change', (e) => {
      this.setTheme(e.matches);
    });
  }

  setTheme(isDark: boolean) {
    const body = document.body;
    body.classList.remove('dark', 'default');
    body.classList.add(isDark ? 'dark' : 'default');
  }
}
