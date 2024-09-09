import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateService } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/pages/language-switcher/language-switcher.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daos-learning-center';
  options = [
    { path: '/home', title: 'Home'},
    { path: '/learning/students', title: 'Students'},
    {path:'/about', title: 'About'}
  ];

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
