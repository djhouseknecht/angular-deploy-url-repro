import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        Welcome to App Component
      </h1>
      <h3>The CDN URL is:</h3>
      <pre><code>
        {{cdnUrl}}
      </code></pre>
    </div>
    <h2>Here is a link to some routes: </h2>
    <ul>
      <li>
        <h2><a [routerLink]="['/']">Home</a></h2>
      </li>
      <li>
        <h2><a [routerLink]="['/hammer']">Thor's Hammer</a></h2>
      </li>
      <li>
        <h2><a [routerLink]="['/bifrost']">The Bi-Frost</a></h2>
      </li>
    </ul>
    <div style="text-align:center" class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-deploy-url-repro';
  cdnUrl = environment.cdnUrl;
}
