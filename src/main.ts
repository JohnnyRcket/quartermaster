import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {MainPageComponent} from './app/main-page.component';
import * as bootstrap from 'bootstrap';

bootstrapApplication(MainPageComponent, appConfig)
  .catch((err) => console.error(err));
