import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private router: Router) {}

  logout() {
    // Clear any session data here if needed (e.g. localStorage.clear())
    this.router.navigate(['/login']);
  }

}
