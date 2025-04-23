import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {MainPageComponent} from './app/main-page.component';

bootstrapApplication(MainPageComponent, appConfig)
  .catch((err) => console.error(err));
